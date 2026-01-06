/**
 * data-svg 속성을 가진 요소에 SVG 주입
 */
export function loadSVG() {
  document.querySelectorAll("[data-svg]").forEach(el => {
    fetch(el.dataset.svg)
      .then(res => res.text())
      .then(svg => {
        el.innerHTML = svg;
      });
  });
}


export const LOGO_COUNT_PER_PAGE = 24;

/**
 * 로고 경로 배열 생성
 * @param {string} dir - 로고 폴더 경로
 * @param {number} [count=LOGO_COUNT] - 로고 개수
 * @returns {string[]} 로고 경로 배열
 */
export function getLogos(dir, count = LOGO_COUNT_PER_PAGE) {
  return Array.from({ length: count }, (_, i) =>
    `public/assets/logos/${dir}/press_logo_${String(i + 1).padStart(3, "0")}.png`
  );
}

export const lightModeLogos = getLogos("light_mode_logo");
export const darkModeLogos = getLogos("dark_mode_logo");


const pressNames = [
  "머니투데이", "경향신문", "뉴스타파", "오마이뉴스", "데일리안", "스포츠서울",
  "스포츠동아", "문화일보", "KBS WORLD", "Korea JoongAng Daily", "Insight", "법률방송뉴스",
  "시사저널e", "조이뉴스24", "헤럴드경제", "에너지경제", "비즈니스포스트", "스코어데일리",
  "KNN", "The Korea Herald", "MBC", "NewDaily", "국민일보", "일간스포츠"
];

/**
 * 언론사 ID-이름-로고를 Map 형태로 저장
 * @type {Map<number, {name: string, logo: string}>}
 */
export const pressMap = new Map(
  pressNames.map((name, pressId) => [
    pressId,
    {
      name,
      logo: `public/assets/logos/light_mode_logo/press_logo_${String(
        pressId + 1
      ).padStart(3, "0")}.png`,
    },
  ])
);
