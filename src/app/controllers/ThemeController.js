import { initSystemTheme } from "../../utils/theme.js";

export class ThemeController {
  constructor({ onChange } = {}) {
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
