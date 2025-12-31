import { createAutoRollingNewsBar } from "./components/autoRollingNewsBar";
import './autoRollingNews.css';
import { autoRollingNewsData1, autoRollingNewsData2 } from "../../data/autoRollingNewsData";

export function createAutoRollingNews() {
    const autoRollingNews = document.createElement('aside');
    autoRollingNews.className = 'autoRollingNews';
    const autoRollingNewsBarA = createAutoRollingNewsBar('rolling-news-a', autoRollingNewsData1, 5000);
    const autoRollingNewsBarB = createAutoRollingNewsBar('rolling-news-b', autoRollingNewsData2, 5000);
    
    autoRollingNews.prepend(autoRollingNewsBarA.el);
    autoRollingNews.prepend(autoRollingNewsBarB.el);

    autoRollingNewsBarA.start();
    setTimeout(() => {
        autoRollingNewsBarB.start();
    }, 1000);

    return autoRollingNews;
}