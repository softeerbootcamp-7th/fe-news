import { test, expect } from "@playwright/test";

test.describe("router query state", () => {
  test("deep link to subscribed tab forces list view", async ({ page }) => {
    await page.goto("/?tab=subscribed");
    const activeTab = page.locator('.tab.is-active[data-tab="subscribed"]');
    await expect(activeTab).toBeVisible();
    await expect(page.locator("#logos")).toHaveClass(/is-newslist/);
    await expect(page).toHaveURL(/tab=subscribed/);
  });

  test("grid page is reflected in URL", async ({ page }) => {
    await page.goto("/?view=grid&page=2");
    await expect(page.locator('.icon-btn.is-active[data-view="grid"]')).toBeVisible();
    await expect(page).toHaveURL(/view=grid/);
  });

  test("list view ignores page param", async ({ page }) => {
    await page.goto("/?view=list&page=2");
    await expect(page.locator('.icon-btn.is-active[data-view="list"]')).toBeVisible();
    await expect(page).not.toHaveURL(/page=2/);
  });

  test("back/forward restores view", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-action="view"][data-view="list"]').click();
    await expect(page).toHaveURL(/view=list/);
    await page.goBack();
    await expect(page.locator('.icon-btn.is-active[data-view="grid"]')).toBeVisible();
    await page.goForward();
    await expect(page.locator('.icon-btn.is-active[data-view="list"]')).toBeVisible();
  });
});
