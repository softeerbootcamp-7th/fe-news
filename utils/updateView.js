import { renderGrid } from "./grid/grid.js";
import { renderList, updateList } from "./list/list.js";

let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

export function updateView({type, view, currentPage, currentData, itemCount}) {
    if (type === "GRID") {
        renderGrid({
            container: view,
            data: currentData,
            page: currentPage
        });
    }
    else if (type === "LIST-INIT") {
        renderList({
            container: view,
            data: currentData,
            page: currentPage
        });
    }
    else if (type === "LIST-UPDATE") {
        let viewUpdate = document.getElementById('news-list-container');

        updateList({
            container: viewUpdate
        });
    }

    // 페이지 버튼 숨김처리
    prevBtn.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility =
        (currentPage + 1) * itemCount >= currentData.length
        ? 'hidden'
        : 'visible';
}