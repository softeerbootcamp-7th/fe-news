const modalOverlay = document.querySelector('.modal-overlay')

export const modal = {
  open() {
    modalOverlay.style.opacity = 1
    modalOverlay.style.visibility = 'visible'
    modalOverlay.style.pointerEvents = 'auto'
  },
  close() {
    modalOverlay.style.opacity = 0
    modalOverlay.style.visibility = 'hidden'
    modalOverlay.style.pointerEvents = 'none'
  }
}