function createSubscribeButton({ label, onClick, type = 'plus' }) {
    const button = document.createElement('div');
    button.className = 'component__button';

    const content = document.createElement('div');
    content.className = 'component__button-content';
    content.textContent = label;

    const img = document.createElement('img');
    img.className = 'component__button-img';
    img.src = `../assets/icons/btn-${type}.svg`;

    button.append(img, content);

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}

export { createSubscribeButton };