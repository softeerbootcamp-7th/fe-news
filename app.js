// import { NewsStand } from "./components/NewsStand.js";
import { presses } from "./data/presses.js";
import { renderGrid } from "./grid.js";

// const newsGrid = document.getElementById("newsGrid");
// newsGrid.appendChild(NewsStand());

// 날짜 출력
function getDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const dayNames = ['일','월','화','수','목','금','토'];
    const day = dayNames[now.getDay()];

    const today = document.getElementById("current-date");
    today.innerHTML = `${year}. ${month}. ${date}. ${day}요일`;
}
getDate();

let currentPage = 0;
const grid = document.getElementById('newsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateArrows(){
    prevBtn.style.display = currentPage === 0 ? 'none' : 'block';
    nextBtn.style.display = (currentPage + 1) * 24 >= presses.length ? 'none' : 'block';
}

function updateView(){
    renderGrid({
        container: grid,
        data: presses,
        page: currentPage
    });
    updateArrows();
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateView();
  }
});

nextBtn.addEventListener('click', () => {
  if ((currentPage + 1) * 24 < presses.length) {
    currentPage++;
    updateView();
  }
});

updateView();