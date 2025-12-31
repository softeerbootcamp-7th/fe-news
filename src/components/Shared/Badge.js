import "./Badge.css";

export function Badge(count, isActive = false) {
  return `<span class="badge ${isActive ? "is-active" : ""}">${count}</span>`;
}
