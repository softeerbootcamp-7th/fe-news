export function reload(element) {
    element.addEventListener('click', () => location.reload(true))
}