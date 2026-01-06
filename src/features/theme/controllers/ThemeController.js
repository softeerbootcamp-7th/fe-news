import { initSystemTheme } from "../../../shared/lib/index.js";

export class ThemeController {
  constructor({ context, onChange } = {}) {
    // context는 시그니처 일관성용(현재 initSystemTheme는 전역 window/document에 의존)
    this.context = context;
    this.onChange = onChange;
    this._cleanup = null;
  }

  init() {
    this._cleanup = initSystemTheme({
      onChange: (theme) => {
        if (typeof this.onChange === "function") this.onChange(theme);
      },
    });
  }

  destroy() {
    if (typeof this._cleanup === "function") this._cleanup();
    this._cleanup = null;
  }
}
