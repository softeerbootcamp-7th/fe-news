const modal = document.getElementById('unsubscribeModal');
const message = document.getElementById('unsubscribeMessage');
const confirmBtn = document.getElementById('confirmUnsubscribe');
const cancelBtn = document.getElementById('cancelUnsubscribe');

let confirmCallback = null;

export function openUnsubscribeModal({ pressName, onConfirmCallback }) {
  message.textContent = `${pressName}`;
  confirmCallback = onConfirmCallback;
  modal.classList.add('active');
}

confirmBtn.addEventListener('click', () => {
  modal.classList.remove('active');

  if (confirmCallback) {
    confirmCallback();
    confirmCallback = null;
  }
});

cancelBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  confirmCallback = null;
});
