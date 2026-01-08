import { removeSubscription } from '../store/subscription';

export function createSubAlert(pressId, pressGrid) {
  if (document.querySelector('.sub-alert')) return;

  const alert = document.createElement('div');
  alert.classList.add('sub-alert');

  const message = document.createElement('p');
  message.className = 'alert-message';
  message.textContent = `${pressId}을(를) 구독 해지하시겠습니까?`;

  const confirmButton = document.createElement('button');
  confirmButton.className = 'confirm-button';
  confirmButton.textContent = '예, 해지합니다';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'cancel-button';
  cancelButton.textContent = '아니오';

  confirmButton.addEventListener('click', () => {
    removeSubscription(pressId);
    alert.remove();
  });

  cancelButton.addEventListener('click', () => {
    alert.remove();
  });

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'alert-buttons';
  buttonWrapper.append(confirmButton, cancelButton);

  alert.append(message, buttonWrapper);
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('visible');
  }, 100);
}
