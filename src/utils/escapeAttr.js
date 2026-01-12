export function escapeHtml(str = "") {
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m])
  );
}

// 의미상 구분용 (실제로는 동일 처리)
export function escapeAttr(str = "") {
  return escapeHtml(str);
}
