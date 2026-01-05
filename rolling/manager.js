import { ROLLING_INTERVAL } from './config.js';

function createRollingManager() {
    const timers = new Map();

    function register(key, rollingBar, { delay = 0, interval = ROLLING_INTERVAL } = {}) {
        if(timers.has(key)) return;

        setTimeout(() => {
            const id = setInterval(() => {
                rollingBar.tick();
            }, interval);

            timers.set(key, id);
        }, delay);
    }

    return { register };
}

export { createRollingManager };