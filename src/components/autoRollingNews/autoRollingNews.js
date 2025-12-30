import { createAutoRollingNewsBar } from "./components/autoRollingNewsBar";
import './autoRollingNews.css';

export function createAutoRollingNews() {
    const autoRollingNews = document.createElement('aside');
    autoRollingNews.className = 'autoRollingNews';
    const autoRollingNewsBarA = createAutoRollingNewsBar();
    const autoRollingNewsBarB = createAutoRollingNewsBar();
    
    autoRollingNews.prepend(autoRollingNewsBarA);
    autoRollingNews.prepend(autoRollingNewsBarB);

    return autoRollingNews;
}