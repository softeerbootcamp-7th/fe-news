function loadSVG() { 
    // SVG를 인라인으로 주입해 CSS로 색상 제어가 가능하도록 처리
    document.querySelectorAll("[data-svg]").forEach(el => {
    fetch(el.dataset.svg)
        .then(res => res.text())
        .then(svg => {
        el.innerHTML = svg;
        });
    })
}

const dateEl = document.querySelector(".date");

function updateDate() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const day = now.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  dateEl.textContent = `${yyyy}. ${mm}. ${dd}. ${days[day]}요일`;
}

loadSVG();
updateDate();
setInterval(updateDate, 60000); // 매 분마다 시간 업데이트



// ---

const pressLogoContainer = document.querySelector('.press-logo-container');
// 예시용 언론사 로고 리스트 (나중에 실제 이미지 경로로 교체 가능)
const pressLogos = [
  'public/assets/logos/light_mode_logo/press_logo_001.png',
  'public/assets/logos/light_mode_logo/press_logo_002.png',
  'public/assets/logos/light_mode_logo/press_logo_003.png',
  'public/assets/logos/light_mode_logo/press_logo_004.png',
  'public/assets/logos/light_mode_logo/press_logo_005.png',
  'public/assets/logos/light_mode_logo/press_logo_006.png',
  'public/assets/logos/light_mode_logo/press_logo_007.png',
  'public/assets/logos/light_mode_logo/press_logo_008.png',
  'public/assets/logos/light_mode_logo/press_logo_009.png',
  'public/assets/logos/light_mode_logo/press_logo_010.png',
  'public/assets/logos/light_mode_logo/press_logo_011.png',
  'public/assets/logos/light_mode_logo/press_logo_012.png',
  'public/assets/logos/light_mode_logo/press_logo_013.png',
  'public/assets/logos/light_mode_logo/press_logo_014.png',
  'public/assets/logos/light_mode_logo/press_logo_015.png',
  'public/assets/logos/light_mode_logo/press_logo_016.png',
  'public/assets/logos/light_mode_logo/press_logo_017.png',
  'public/assets/logos/light_mode_logo/press_logo_018.png',
  'public/assets/logos/light_mode_logo/press_logo_019.png',
  'public/assets/logos/light_mode_logo/press_logo_020.png',
  'public/assets/logos/light_mode_logo/press_logo_021.png',
  'public/assets/logos/light_mode_logo/press_logo_022.png',
  'public/assets/logos/light_mode_logo/press_logo_023.png',
  'public/assets/logos/light_mode_logo/press_logo_024.png',
];

// 다크모드 로고 리스트 (나중에 실제 이미지 경로로 교체 가능)
const darkModeLogos = [
  'public/assets/logos/dark_mode_logo/press_logo_001.png',
  'public/assets/logos/dark_mode_logo/press_logo_002.png',
  'public/assets/logos/dark_mode_logo/press_logo_003.png',
  'public/assets/logos/dark_mode_logo/press_logo_004.png',
  'public/assets/logos/dark_mode_logo/press_logo_005.png',
  'public/assets/logos/dark_mode_logo/press_logo_006.png',
  'public/assets/logos/dark_mode_logo/press_logo_007.png',
  'public/assets/logos/dark_mode_logo/press_logo_008.png',
  'public/assets/logos/dark_mode_logo/press_logo_009.png',
  'public/assets/logos/dark_mode_logo/press_logo_010.png',
  'public/assets/logos/dark_mode_logo/press_logo_011.png',
  'public/assets/logos/dark_mode_logo/press_logo_012.png',
  'public/assets/logos/dark_mode_logo/press_logo_013.png',
  'public/assets/logos/dark_mode_logo/press_logo_014.png',
  'public/assets/logos/dark_mode_logo/press_logo_015.png',
  'public/assets/logos/dark_mode_logo/press_logo_016.png',
  'public/assets/logos/dark_mode_logo/press_logo_017.png',
  'public/assets/logos/dark_mode_logo/press_logo_018.png',
  'public/assets/logos/dark_mode_logo/press_logo_019.png',
  'public/assets/logos/dark_mode_logo/press_logo_020.png',
  'public/assets/logos/dark_mode_logo/press_logo_021.png',
  'public/assets/logos/dark_mode_logo/press_logo_022.png',
  'public/assets/logos/dark_mode_logo/press_logo_023.png',
  'public/assets/logos/dark_mode_logo/press_logo_024.png',
];

// 이미지 리스트를 순회하면서 li 요소를 동적으로 추가
pressLogos.forEach((src) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = src;
  img.alt = '언론사 로고';
  li.appendChild(img);
  pressLogoContainer.appendChild(li);
});
