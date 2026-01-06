import data from '@/assets/data/pressData.json' assert{ type: 'json' };

function updateContent(element, press, title, wrapper) {
    if (wrapper.value === press.length) {
        wrapper.value = 0;
    }

    element.innerHTML = `${press[wrapper.value]}${title[wrapper.value]}`;
}

export function rollingHeadLine() {
    const bothTargetElement = document.querySelector('#autoRollingNewsBar');
    const leftTargetElement = document.querySelector('#autoRollingNewsBar .left');
    const rightTargetElement = document.querySelector('#autoRollingNewsBar .right');
    
    const pressHtmlString = data.map(each => `<div class="press">${each.press}</div>`);
    const titleHtmlString = data.map(each => `<div class="newsTitle">${each.mainTitle}</div>`);
    
    let indexWrapper = { value: 0 };
    
    const timers = {
        left: null,
        right: null
    };

    const hoverState = { value: false };

    function initHeadLine() {
        updateContent(leftTargetElement, pressHtmlString, titleHtmlString, indexWrapper);
        indexWrapper.value += 1;
        updateContent(rightTargetElement, pressHtmlString, titleHtmlString, indexWrapper);
        indexWrapper.value += 1;
    }

    function animateCycle(element, delay, timerKey) {
        if (hoverState.value) return;

        timers[timerKey] = setTimeout(() => {
            if (hoverState.value) return;

            const pressTarget = element.querySelector('.press');
            const titleTarget = element.querySelector('.newsTitle');

            pressTarget.classList.add('rollup-out');
            titleTarget.classList.add('rollup-out');

            const handleAnimationEnd = () => {
                pressTarget.removeEventListener('animationend', handleAnimationEnd);

                pressTarget.classList.remove('rollup-out');
                titleTarget.classList.remove('rollup-out');

                updateContent(element, pressHtmlString, titleHtmlString, indexWrapper);

                const newPress = element.querySelector('.press');
                const newTitle = element.querySelector('.newsTitle');

                indexWrapper.value += 1;

                newPress.classList.add('rollup-in');
                newTitle.classList.add('rollup-in');

                newPress.addEventListener('animationend', () => {
                    newPress.classList.remove('rollup-in');
                    newTitle.classList.remove('rollup-in');

                    animateCycle(element, 5000, timerKey);
                }, { once: true });
            };

            pressTarget.addEventListener('animationend', handleAnimationEnd);
        }, delay);
    }

    function setHoverEvent() {
        bothTargetElement.addEventListener(('mouseenter'), () => {
            hoverState.value = true;
            if (timers.left) clearTimeout(timers.left);
            if (timers.right) clearTimeout(timers.right);
        });

        bothTargetElement.addEventListener('mouseleave', () => {
            hoverState.value = false;

            const leftAnimating = leftTargetElement.querySelector('.rollup-out, .rollup-in');
            const rightAnimating = rightTargetElement.querySelector('.rollup-out, .rollup-in');

            if (!leftAnimating) {
                animateCycle(leftTargetElement, 5000, 'left');
            }

            if (!rightAnimating) {
                animateCycle(rightTargetElement, 6000, 'right');
            }
        });
    }

    function setVisibilityEvent() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (timers.left) clearTimeout(timers.left);
                if (timers.right) clearTimeout(timers.right);
            } else {
                if (!hoverState.value) {
                    const leftPress = leftTargetElement.querySelector('.press');
                    const leftTitle = leftTargetElement.querySelector('.newsTitle');
                    const rightPress = rightTargetElement.querySelector('.press');
                    const rightTitle = rightTargetElement.querySelector('.newsTitle');

                    leftPress?.classList.remove('rollup-out', 'rollup-in');
                    leftTitle?.classList.remove('rollup-out', 'rollup-in');
                    rightPress?.classList.remove('rollup-out', 'rollup-in');
                    rightTitle?.classList.remove('rollup-out', 'rollup-in');

                    animateCycle(leftTargetElement, 5000, 'left');
                    animateCycle(rightTargetElement, 6000, 'right');
                }
            }
        })
    }
    
    initHeadLine();
    setHoverEvent();
    setVisibilityEvent();

    animateCycle(leftTargetElement, 5000, 'left');
    animateCycle(rightTargetElement, 6000, 'right');
}