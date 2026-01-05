export function pressNameFromFilename(filename) {
  // 파일명 기반(임시) 표시용 라벨: 확장자/뒤쪽 숫자 제거
  return String(filename || "")
    .replace(/\.(png|jpe?g|webp|svg)$/i, "")
    .replace(/\s+\d+$/g, "")
    .trim();
}
