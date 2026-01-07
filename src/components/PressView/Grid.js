import { GRID_CONSTANTS } from '@/constants';
import { pickRandomNumberList } from '@/utils/randomPicker';

const createCellHTML = (press) => {
    const path = GRID_CONSTANTS.NEWS_BRAND_LIST[press];
    return `
        <img class="grid-cell" src="${path}">
    `
}

export function renderGrid(target = '#viewArea .center') {
    const param = {
        count: GRID_CONSTANTS.CELL_COUNT,
        range: GRID_CONSTANTS.LOGO_COUNT,
    }
    const pressList = pickRandomNumberList(param);
    const htmlString = pressList.map(createCellHTML).join('');

    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.innerHTML = htmlString;
    }
}