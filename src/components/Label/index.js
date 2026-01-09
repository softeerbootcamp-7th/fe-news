import '@/components/Label/style.css';
import Plus from '@/assets/images/light_mode_logo/plus.png';
import Closed from '@/assets/images/light_mode_logo/closed.png';

export const Label = (backgroundColor, isSubscribed) => {
    const previousColor = backgroundColor === 'white' ? 'gray' : 'white';
    const [icon, text] = isSubscribed === true ? [Closed, '해지하기'] : [Plus, '구독하기'];

    return `
        <div id="label" class="${previousColor}">
            <img class="icon" src="${icon}">
            <div class="text">${text}</div>
        </div>
    `
};