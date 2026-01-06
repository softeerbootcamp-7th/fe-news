export function initNavigation({ onPrev, onNext }) {
    const prevBtn = document.querySelector('.nav-btn--prev');
    const nextBtn = document.querySelector('.nav-btn--next');

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);

    return {
        update({ page, lastPage }) {
            prevBtn.classList.toggle('hidden', page === 0);
            nextBtn.classList.toggle('hidden', page === lastPage);
        },
    };
}
