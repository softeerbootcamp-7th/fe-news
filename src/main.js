import { createAutoRollingNews } from './components/autoRollingNews/autoRollingNews';
import { createHeader } from './components/header/header';
import './styles/layout.css';
import './styles/index.css';

const app = document.querySelector('#app');

app.innerHTML =  `
  <article class="news"></article>
`
const layoutMain = app.querySelector('.news');
const header = createHeader();
const autoRollingNews = createAutoRollingNews();

layoutMain.append(header);
layoutMain.append(autoRollingNews);
