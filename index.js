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
