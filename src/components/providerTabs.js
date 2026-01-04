import { setPressGridTab } from './pressGrid.js';

let currentTab = 'all';

const allTab = document.querySelector('.tab-all');
const subscribedTab = document.querySelector('.tab-subscribed');


function setTab(tab) {
    if (tab === currentTab) return;
    currentTab = tab;
    updateTabs(tab);
    setPressGridTab(tab);
}

function updateTabs(currentTab) {
    allTab.classList.toggle('tab-item--active', currentTab === 'all');
    subscribedTab.classList.toggle('tab-item--active', currentTab === 'subscribed');
}

export function initProviderTabs() {
    allTab.addEventListener('click', () => {
        setTab('all');
    });

    subscribedTab.addEventListener('click', () => {
        setTab('subscribed');
    });
}
