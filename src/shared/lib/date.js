export function formatKoreanDateLabel({
  date = new Date(),
  dayNames = [],
} = {}) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const day = Array.isArray(dayNames) ? dayNames[date.getDay()] : "";

  return {
    text: `${yyyy}. ${mm}. ${dd}. ${day}`,
    datetime: `${yyyy}-${mm}-${dd}`,
  };
}
