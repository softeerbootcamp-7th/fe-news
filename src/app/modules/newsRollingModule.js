import { NewsRollingController } from "../controllers/NewsRollingController.js";

export function createNewsRollingModule({ context, shuffle } = {}) {
  const controller = new NewsRollingController({ context, shuffle });

  return {
    controller,
    async start() {
      await controller.start();
    },
    destroy() {
      controller.destroy();
    },
  };
}
