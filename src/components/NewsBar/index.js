import '@/components/NewsBar/style.css';
import { RollingNewsBar } from '@/js/rolling';

export const NewsBar = () => {
    return `
      <ul id="autoRollingNewsBar">
        <li class="left"></li>
        <li class="right"></li>
      </ul>
    `
};

export const rollingHeadLine = () => {
    const newsBar = new RollingNewsBar('#autoRollingNewsBar');
    newsBar.init();
}