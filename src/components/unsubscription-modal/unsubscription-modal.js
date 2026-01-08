import { Observer } from '@/libs';
import {
  unsubscriptionModalEventHandler,
  unsubscriptionModalStore,
} from '@/models';
import { unsubscriptionModalTemplate } from '@/templates';

export const UnsubscriptionModal = () => {
  let cleanupFunctions = null;
  let currentIsOpen = false;

  const { handleClickOverlay, handleClickModalButton, handleKeydown } =
    unsubscriptionModalEventHandler();

  const getUnsubscriptionModal = () => {
    return document.querySelector('.unsubscription-modal');
  };
  const getUnsubscriptionModalOverlay = () => {
    return document.querySelector('.unsubscription-modal__overlay');
  };

  const createUnsubscriptionModal = ({ pressName }) => {
    const unsubscriptionModal = unsubscriptionModalTemplate({
      pressName,
    });

    document.body.insertAdjacentHTML('beforeend', unsubscriptionModal);

    const $unsubscriptionModal = getUnsubscriptionModal();
    const $unsubscriptionModalOverlay = getUnsubscriptionModalOverlay();
    $unsubscriptionModal.focus();

    const modalClickEventHandler = handleClickModalButton(pressName);

    $unsubscriptionModalOverlay.addEventListener('click', handleClickOverlay);
    $unsubscriptionModal.addEventListener('click', modalClickEventHandler);
    document.addEventListener('keydown', handleKeydown);

    return {
      cleanup() {
        $unsubscriptionModalOverlay.removeEventListener(
          'click',
          handleClickOverlay,
        );
        $unsubscriptionModal.removeEventListener(
          'click',
          modalClickEventHandler,
        );
        document.removeEventListener('keydown', handleKeydown);

        $unsubscriptionModal.remove();
        $unsubscriptionModalOverlay.remove();
      },
    };
  };

  const updateUnsubscriptionModal = () => {
    const { pressName, isOpen } = unsubscriptionModalStore.getState();

    if (currentIsOpen === isOpen) {
      return;
    }
    currentIsOpen = isOpen;

    if (!isOpen) {
      cleanupFunctions?.();
      cleanupFunctions = null;
      return;
    }

    const { cleanup } = createUnsubscriptionModal({
      pressName,
    });
    cleanupFunctions = cleanup;
  };

  const observer = new Observer(updateUnsubscriptionModal);
  unsubscriptionModalStore.subscribe(observer);
};
