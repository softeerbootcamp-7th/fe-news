import { subscribedNewspaperStore, unsubscriptionModalStore } from '@/models';

export const unsubscriptionModalEventHandler = () => {
  const handleClickOverlay = ({ target }) => {
    if (target.closest('.unsubscription-modal__overlay')) {
      unsubscriptionModalStore.setIsOpen(false);
    }
  };

  const handleClickModalButton =
    (pressName) =>
    ({ target }) => {
      if (target.closest('button')) {
        if (target.closest('.unsubscription-modal__buttons--accept')) {
          subscribedNewspaperStore.unsubscribeNewspaper(pressName);
        }
        unsubscriptionModalStore.setIsOpen(false);
      }
    };

  /**
   * @description 포커스 트랩, esc 모달 닫기 등의 이벤트 핸들러
   */
  const handleKeydown = (event) => {
    const $unsubscriptionModal = document.querySelector(
      '.unsubscription-modal',
    );
    if (!$unsubscriptionModal) {
      return;
    }
    const focusElements = $unsubscriptionModal.querySelectorAll('button');
    const firstFocusElement = focusElements[0];
    const lastFocusElement = focusElements[focusElements.length - 1];

    const { key, shiftKey } = event;

    if (key === 'Tab') {
      if (document.activeElement === lastFocusElement && !shiftKey) {
        event.preventDefault();
        firstFocusElement.focus();
      } else if (document.activeElement === firstFocusElement && shiftKey) {
        event.preventDefault();
        lastFocusElement.focus();
      }
      return;
    }

    if (key === 'Escape') {
      unsubscriptionModalStore.setIsOpen(false);
      return;
    }
  };

  return {
    handleClickOverlay,
    handleClickModalButton,
    handleKeydown,
  };
};
