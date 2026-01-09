# Router Refactor Plan

## Goal
Centralize UI rendering around a query-based SPA router so that view/tab/page changes flow through a single "URL -> state -> render" pipeline. List internal state stays in store/runtime (not in URL). Back/forward works via `popstate`, no full page reloads.

## Route Spec (URL Query)
- `view`: `grid | list` (default: `grid`)
- `tab`: `all | subscribed` (default: `all`)
- `page`: `0..n` (default: `0`, only used when `view=grid`)

### Normalization Rules
- If `tab=subscribed` then force `view=list`.
- If `view=list` then force `page=0`.
- Unknown values fallback to defaults.

## Current Render Triggers (Mapping)
The following functions currently mutate state and/or render directly. These are the touch points to funnel into the router.

### 1) View/Tab
- `src/app/lib/actions/viewActions.js`
  - `handleTabAction()` currently sets view + tab and calls `newsView.setTab()` (which renders).
  - **Change**: route update only: `router.pushRoute({ tab })`.
- `src/app/lib/runtimes/viewRuntime.js`
  - `setViewFromTarget()` sets view and renders immediately.
  - **Change**: route update only: `router.pushRoute({ view })`.
- `src/widgets/newsView/controllers/NewsViewController.js`
  - `setTab()` sets tab and renders immediately.
  - **Change**: keep as internal helper OR stop calling from actions; rendering is controlled by router only.

### 2) Pagination
- `src/widgets/newsView/controllers/NewsViewController.js`
  - `prevPage()/nextPage()` update `page` and render.
  - **Change**: actions call `router.pushRoute({ page: nextPage })` (router normalizes + renders).
- `src/widgets/newsView/lib/newsViewUtils.js`
  - `getPagedItems()` clamps page and mutates store.
  - **Change**: move page normalization into router; make `getPagedItems()` pure (no store writes).

### 3) Subscriptions
- `src/app/lib/actions/subscriptionActions.js`
  - `handleToggleSubscription()` triggers `newsView.render()` after toggle.
  - **Change**: call `router.rerender()` (route stays same; render centralized).
  - `handleListSubscribe()` forces view/list + tab/subscribed.
  - **Change**: after subscription, call `router.pushRoute({ tab: "subscribed", view: "list" })`.

### 4) Theme
- `src/app/lib/appBindings.js`
  - theme `onChange` calls `app.newsView.render()`.
  - **Change**: call `router.rerender()` (route unchanged, render centralized).

### 5) Navigation Actions
- `src/app/lib/actions/navigationActions.js`
  - Delegates to list or grid actions (which render).
  - **Change**: if view=list, keep list internal navigation (not in URL). If view=grid, update `page` via router.

## Target Architecture
Create a router module that owns URL parsing + state sync + rendering.

### Suggested location
- `src/app/Router/appRouter.js`

### Router responsibilities
- Parse query -> normalized route
- Apply route to store
- Update view toggle UI
- Set render function (`list` vs `grid`)
- Render news view (single entry)
- Sync URL via `pushState/replaceState`
- Handle `popstate`

### Router public API
- `init()`
- `pushRoute(partial)`
- `replaceRoute(partial)`
- `rerender()`

## Refactor Sequence (Safe, Incremental)

### Phase 1: Introduce router (no behavior changes)
1. Add router module with:
   - `parseQuery`, `buildQuery`, `normalizeRoute`, `applyRoute`
2. Wire `app.router = createAppRouter(app)` in bindings.
3. Call `app.router.init()` in `initApp()` before other renders.
4. Keep existing render calls temporarily.

### Phase 2: Move rendering triggers into router
1. Replace direct render calls in:
   - `viewRuntime.setViewFromTarget`
   - `viewActions.handleTabAction`
   - `newsGridViewActions.prev/next/tab`
   - `subscriptionActions.handleToggleSubscription` / `handleListSubscribe`
   - theme `onChange`
2. These should only call `router.pushRoute()` or `router.rerender()`.

### Phase 3: Make render pipeline pure
1. Remove store writes from `getPagedItems()`.
2. Keep page clamping in router.
3. Ensure `NewsViewController.setTab()` is not used by actions.

### Phase 4: Cleanup + tests
1. Remove unused action helpers (`newsGridViewActions.render`, etc.).
2. Add a small test checklist (manual):
   - Deep link with `?view=list&tab=subscribed`
   - Back/forward restores state
   - `view=list` ignores `page`
   - tab click updates URL without reload

## URL Behavior Examples
- `/` -> `{ view:grid, tab:all, page:0 }`
- `/?tab=subscribed` -> `{ view:list, tab:subscribed, page:0 }`
- `/?view=grid&page=2` -> `{ view:grid, tab:all, page:2 }`
- `/?view=list&page=2` -> normalized to `{ view:list, page:0 }`

## Notes
- List internal state stays out of URL as requested.
- Subscription set remains store-only; URL represents UI state only.
- Router should be the only place that calls `newsView.render()`.

## Work Checklist (Ordered Tasks)
1. Define route spec and normalization rules (view/tab/page only).
2. Create router module at `src/app/Router/appRouter.js`.
3. Wire router into app bindings and init flow.
4. Refactor view/tab actions to update URL only.
5. Refactor grid pagination to update URL only.
6. Refactor subscription actions to use router rerender/pushRoute.
7. Refactor theme change to use router rerender.
8. Make pagination utils pure (no store writes).
9. Remove unused action helpers and direct render calls.
10. Run manual checks: deep link, back/forward, list ignores page, URL updates without reload.

## Manual Test Checklist (After Refactor)
- [ ] Open `/` and confirm grid + all tab + page 0
- [ ] Open `/?tab=subscribed` -> list + subscribed, page resets to 0
- [ ] Open `/?view=grid&page=2` -> grid page 2 (if enough pages)
- [ ] Open `/?view=list&page=2` -> list page 0
- [ ] Back/forward restores view/tab/page without reload
- [ ] Tab click updates URL without full refresh
