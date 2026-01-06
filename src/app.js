import '@/assets/css/style.css'
import { Header } from '@/components/Header';
import { PressView } from '@/components/PressView';
import { NewsBar } from '@/components/NewsBar';
import { rollingHeadLine } from '@/js/rolling';
import { addCell } from '@/js/cell';


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