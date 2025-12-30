import '@/assets/css/style.css'
import { getDate } from '@/js/Date.js';
import { reload } from '@/js/Reload.js';
import TitleLogo from '@/assets/images/light_mode_logo/title_logo.png';

document.querySelector('#app').innerHTML = `
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

reload(document.querySelector('#title'));