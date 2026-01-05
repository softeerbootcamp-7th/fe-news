import { presses } from '../../data/presses.js';

import { updateView } from '../updateView.js';
import { movePrev } from '../page/movePrevPage.js';
import { moveNext } from '../page/moveNextPage.js';



let currentPage = 0;
let currentData = presses;

let list, prevBtn, nextBtn;


export function initList({ viewId, prevBtnId, nextBtnId }){
    list = document.getElementById(viewId);
    prevBtn = document.getElementById(prevBtnId);
    nextBtn = document.getElementById(nextBtnId);

    prevBtn.addEventListener('click', () => {
        currentPage = movePrev(currentPage);
        updateView({
            type: "LIST",
            view: list,
            currentPage: currentPage,
            currentData: currentData
        });
    })
    nextBtn.addEventListener('click', () => {
        currentPage = moveNext(currentPage, 24, currentData.length);
        updateView({
            type: "LIST",
            view: list,
            currentPage: currentPage,
            currentData: currentData
        });
    })

    updateView({
        type: "LIST",
        view: list,
        currentPage: currentPage,
        currentData: currentData
    });
}