import './header.css';
import headerIcon from '../../assets/icons/headerIcon.png';
import { getTodayString } from '../../utils/getTodayString';

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'news-header';
    const todayString = getTodayString();

    header.innerHTML = `
        <h1>
            <img id="header-icon" src="${headerIcon}" />
            뉴스스탠드
        </h1>       
        <time>
            ${todayString}
        </time>
    `;

    return header;
}