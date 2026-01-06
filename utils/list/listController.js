import { presses } from '../../data/presses.js';
import { updateView } from '../updateView.js';

let currentPage = 0;
let currentData = presses;

let list, prevBtn, nextBtn;
let isEventBound = false;

export function initListEvents({ viewId, prevBtnId, nextBtnId }){
    if (isEventBound) return;
    isEventBound = true;

    list = document.getElementById(viewId);
    prevBtn = document.getElementById(prevBtnId);
    nextBtn = document.getElementById(nextBtnId);

    render();
}

// list탭을 열때마다 호출
export function showList() {
    if(!list) return;
    render();
}

export function handleListPrev() {
    console.log('listPrev');
}

export function handleListNext() {
    console.log('listNext');
}

function render() {
    updateView({
        type: "LIST-INIT",
        view: list,
        currentPage: currentPage,
        currentData: currentData
    });
}