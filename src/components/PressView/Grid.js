import { GRID_CONSTANTS } from '@/constants';
import { pickRandomNumberList } from '@/utils/randomPicker';
import { Label } from '@/components/Label';

const createCellHTML = (press) => {
    const path = GRID_CONSTANTS.NEWS_BRAND_LIST[press];
    return `
        <button class="grid-button" type="button"><img class="grid-cell" src="${path}"></button>
    `
}

const createImageHTML = (press) => {
    const path = GRID_CONSTANTS.NEWS_BRAND_LIST[press];
    return `
        <img class="grid-cell" src="${path}">
    `
}

const setHoverEvents = (element, press) => {
    element.addEventListener('mouseenter', () => {
        element.innerHTML = `
            ${Label()}
        `
    });
    const htmlString = createImageHTML(press);
    element.addEventListener('mouseleave', () => {
        element.innerHTML = htmlString;
    });
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
    const cellTarget = document.querySelectorAll('#viewArea .center .grid-button');
    cellTarget.forEach((each, index) => {
        setHoverEvents(each, index);
    })
}