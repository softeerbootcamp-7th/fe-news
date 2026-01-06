function createRollingManager() {
    const timers = new Map();

    function register(key, rollingBar, { delay, interval } = {}) {
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