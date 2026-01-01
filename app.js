document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.content__grid');
    const totalItems = 6 * 4; // 24개
    
    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('div');
        item.className = 'content__grid-item';
        grid.appendChild(item);
    }
});