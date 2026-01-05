import data from '@/assets/data/pressData.json' assert{ type: 'json' };

function updateContent(element, press, title, wrapper) {
    if (wrapper.value === press.length) {
        wrapper.value = 0;
    }

    element.innerHTML = `${press[wrapper.value]}${title[wrapper.value]}`;
}

export function rollingHeadLine() {
    function initHeadLine() {
    }

    function setHoverEvent(element, state) {
        element.addEventListener('mouseenter', () => {
            state.value = true;
        });

        element.addEventListener('mouseleave', () => {
            state.value = false;
            if (leftTimer.value !== null) {
                clearTimeout(leftTimer.value);
                leftTimer.value = null;
            }

            if (rightTimer.value !== null) {
                clearTimeout(rightTimer.value);
                rightTimer.value = null;
            }

            setTimeout(() => {
                repeatRolling(leftTargetElement, pressHtmlString, titleHtmlString, indexWrapper, hoverState, rightTimer);
            }, 5000);

            setTimeout(() => {
                repeatRolling(rightTargetElement, pressHtmlString, titleHtmlString, indexWrapper, hoverState, rightTimer);
            }, 6000);
            
        });
    }

    const bothTargetElement = document.querySelector('#autoRollingNewsBar');
    const leftTargetElement = document.querySelector('#autoRollingNewsBar .left');
    const rightTargetElement = document.querySelector('#autoRollingNewsBar .right');
    const pressHtmlString = data.map(each => `<div class="press">${each.press}</div>`);
    const titleHtmlString = data.map(each => `<div class="newsTitle">${each.mainTitle}</div>`);
    let indexWrapper = {
        value: 0
    };
    const hoverState = {
        value: false
    };

    const leftTimer = {
        value: null
    }

    const rightTimer = {
        value: null
    }
    
    setHoverEvent(bothTargetElement, hoverState);
    initHeadLine();
    setTimeout(() => {
        repeatRolling(leftTargetElement, pressHtmlString, titleHtmlString, indexWrapper, hoverState, rightTimer);
    }, 5000);

    setTimeout(() => {
        repeatRolling(rightTargetElement, pressHtmlString, titleHtmlString, indexWrapper, hoverState, rightTimer);
    }, 6000);
}