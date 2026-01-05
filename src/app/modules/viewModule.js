import { ViewController } from "../controllers/ViewController.js";

export function createViewModule({
  context,
  state,
  storageKey,
  newsLogosModule,
} = {}) {
  const controller = new ViewController({ context, state, storageKey });

  return {
    controller,
    init() {
      controller.initFromStorage();
    },
    setFromTarget(target) {
      const view = target?.getAttribute?.("data-view");
      controller.set(view);
      // view 변경 시 subscribed tab의 빈 셀/레이아웃 등 렌더링 차이가 있으므로 재렌더
      newsLogosModule?.render?.();
    },
  };
}
