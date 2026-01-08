function createRollingManager({ rolling_interval, clock_interval }) {
    const bars = new Map();
    let clockTime = 0;
    const slotCount = rolling_interval / clock_interval;

    setInterval(() => {
        const currentSlot = clockTime % slotCount;
        clockTime++;

        bars.forEach((state) => {
            if(state.paused) return;
            if(state.slot !== currentSlot) return;

            state.rollingBar.tick();
        });
    }, clock_interval);

    function register(key, rollingBar, { delay } = {}) {
        const state = { rollingBar, paused: false, slot: (delay / clock_interval) };
        bars.set(key, state);
    };

    function start(key) {
        const state = bars.get(key);
        if(state) state.paused = false;
    };

    function stop(key) {
        const state = bars.get(key);
        if(state) state.paused = true;
    };

    return { register, start, stop };
}

export { createRollingManager };