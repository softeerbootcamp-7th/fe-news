export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function encodePathSegment(filename) {
  // keep slashes as-is (there shouldn't be any), but encode spaces etc.
  return encodeURIComponent(filename).replaceAll("%2F", "/");
}
