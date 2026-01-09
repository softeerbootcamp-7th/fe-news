import { removeSubscription } from '../store/subscription';

export function createSubAlert(pressId) {
  if (document.querySelector('.sub-alert')) return;

  const alert = document.createElement('div');
  alert.classList.add('sub-alert');

  const message = document.createElement('p');
  message.className = 'message';

  const pressName = document.createElement('strong');
  pressName.className = 'press-name';
  pressName.textContent = pressId;

  message.append(pressName, '을(를)\n구독 해지하시겠습니까?');

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

  const messageWrapper = document.createElement('div');
  messageWrapper.className = 'alert-meassage';
  messageWrapper.appendChild(message);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'alert-buttons';
  buttonWrapper.append(confirmButton, cancelButton);

  alert.append(messageWrapper, buttonWrapper);
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('visible');
  }, 100);
}
