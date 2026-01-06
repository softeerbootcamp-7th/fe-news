import { handleGridNext, handleGridPrev } from "../grid/gridController.js";
import { handleListNext, handleListPrev } from "../list/listController.js";

let prevBtn, nextBtn;
let currentMode = 'GRID';   // 초기 그리드 상태

export function initPageController({ prevBtnId, nextBtnId }) {
    prevBtn = document.getElementById(prevBtnId);
    nextBtn = document.getElementById(nextBtnId);

    prevBtn.addEventListener('click', () => {
        if (currentMode === 'GRID') {
            handleGridPrev();
        }
        else if (currentMode === 'LIST') {
            handleListPrev();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentMode === 'GRID') {
            handleGridNext();
        }
        else if (currentMode === 'LIST') {
            handleListNext();
        }
    });
}

export function getPageMode() {
    return currentMode;
}

export function setPageMode(mode) {
    currentMode = mode;
}