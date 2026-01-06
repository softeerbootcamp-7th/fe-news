import '@/assets/css/style.css'
import { Header } from '@/components/Header.js';
import { PressView } from '@/components/PressView.js';
import { NewsBar } from '@/components/NewsBar.js';
import { rollingHeadLine } from '@/js/Rolling';
import { addCell } from '@/js/Cell.js';


const app = document.getElementById('app');

const render = () => {
  app.innerHTML = `
    <div id="view">
      ${Header()}
      ${NewsBar()}
      ${PressView()}
    </div>
  `;
};

render();
addCell();
rollingHeadLine();