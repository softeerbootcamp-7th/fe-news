import data from '@/assets/data/pressData.json' assert{ type: 'json' };

const LEFT_RIGHT_INTERVAL = 1000;
const ROLL_INTERVAL = 5000;

export class RollingNewsBar {
    constructor(selector) {
        this.headlines = [];
        this.index = 0;
        this.isPaused = false;
        this.timers = {
            left: null,
            right: null,
        };

        this.targetElement = document.querySelector(selector);
        if (this.targetElement) {
            this.leftPanel = this.targetElement.querySelector('.left');
            this.rightPanel = this.targetElement.querySelector('.right');
        }
    }

    init() {
        if (!this.targetElement) return;

        this._setHeadlineData();
        this._initHeadline();
        this._setHoverEvents();
        this._scheduleAnimation();
    }

    _setHeadlineData() {
        data.forEach(each => {
            this.headlines.push(
                {
                    press: `<div class="press">${each.press}</div>`,
                    title: `<div class="newsTitle">${each.mainTitle}</div>`,
                }
            )
        })
    }

    _initHeadline() {
        this._updateContent(this.leftPanel, this._getNextHeadline());
        this._updateContent(this.rightPanel, this._getNextHeadline());
    }

    _getNextHeadline() {
        const headline = this.headlines[this.index];
        this.index = (this.index + 1) % this.headlines.length;

        return headline;
    }

    _updateContent(element, headline) {
        element.innerHTML = `${headline.press}${headline.title}`;
    }

    _scheduleAnimation() {
        if (this.isPaused) return;
        this.timers.left = setTimeout(() => this._animate('left'), ROLL_INTERVAL);
        this.timers.right = setTimeout(() => this._animate('right'), ROLL_INTERVAL + LEFT_RIGHT_INTERVAL);
    }

    _addAnimation(element, className) {
        element.press.classList.add(className);
        element.title.classList.add(className);
    }

    _removeAnimation(element, className) {
        element.press.classList.remove(className);
        element.title.classList.remove(className);
    }

    _getInnerElements(panel) {
        return {
            press: panel.querySelector('.press'),
            title: panel.querySelector('.newsTitle'),
        };
    }

    _animate(target) {
        if (this.isPaused) return;
        const targetPanel = target === 'left' ? this.leftPanel : this.rightPanel;
        const innerElement = this._getInnerElements(targetPanel);

        this._addAnimation(innerElement, 'rollup-out');

        innerElement.press.addEventListener('animationend', () => {
            this._removeAnimation(innerElement, 'rollup-out');
            this._updateContent(targetPanel, this._getNextHeadline());

            const newInnerElement = this._getInnerElements(targetPanel);
            this._addAnimation(newInnerElement, 'rollup-in');
            newInnerElement.press.addEventListener('animationend', () => {
                this._removeAnimation(newInnerElement, 'rollup-in');
                this.timers[target] = setTimeout(() => this._animate(target), ROLL_INTERVAL);
            }, { once: true });
        }, { once: true });
    }

    _handleMouseEnter() {
        this.isPaused = true;
        this._clearTimers();
    }

    _handleMouseLeave() {
        this.isPaused = false;
        
        const leftAnimating = this.leftPanel.querySelector('.rollup-out, .rollup-in');
        const rightAnimating = this.rightPanel.querySelector('.rollup-out, .rollup-in');

        if (!leftAnimating) {
            clearTimeout(this.timers.left);
            this.timers.left = setTimeout(() => this._animate('left'), ROLL_INTERVAL);
        }
        if (!rightAnimating) {
            clearTimeout(this.timers.right);
            this.timers.right = setTimeout(() => this._animate('right'), ROLL_INTERVAL + LEFT_RIGHT_INTERVAL);
        }
    }

    _handleVisibilityChange() {
        this.isPaused = document.hidden;

        if (this.isPaused) {
            this._clearTimers();
        } else {
            this._clearTimers();
            this._scheduleAnimation();
        }
    }

    _setHoverEvents() {
        this.targetElement.addEventListener('mouseenter', () => this._handleMouseEnter());
        this.targetElement.addEventListener('mouseleave', () => this._handleMouseLeave());
        document.addEventListener('visibilitychange', () => this._handleVisibilityChange());
    }

    _clearTimers() {
        clearTimeout(this.timers.left);
        clearTimeout(this.timers.right);
    }
}

