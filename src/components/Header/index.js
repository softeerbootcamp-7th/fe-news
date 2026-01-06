import '@/components/Header/style.css';
import { getDate } from '@/js/date';
import TitleLogo from '@/assets/images/light_mode_logo/title_logo.png';

export const Header = () => {
    return `
    <div class="upperTab">
      <button id="title" type="button">
        <img src="${TitleLogo}" class="newspaperIcon">
        <div class="displayText">뉴스스탠드</div>
      </button>
      <div class="todaysDate">
        ${getDate()}
      </div>
    </div>
    `
}