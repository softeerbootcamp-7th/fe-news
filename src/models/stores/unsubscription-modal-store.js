import { UNSUBSCRIPTION_MODAL_INITIAL_STATE } from '@/constants';
import { Subject } from '@/libs';

class UnsubscriptionModalStore extends Subject {
  constructor(initialState = UNSUBSCRIPTION_MODAL_INITIAL_STATE) {
    super(initialState);
  }

  /**
   * @typedef {Object} ModalState
   * @property {boolean} isOpen
   * @property {string} pressName
   *
   * @param {ModalState} modalState
   */
  setModalState(modalState) {
    this.setState({
      ...this.getState(),
      ...modalState,
    });
  }

  /**
   * @param {boolean} isOpen
   */
  setIsOpen(isOpen) {
    this.setState({
      ...this.getState(),
      isOpen,
    });
  }

  /**
   *
   * @param {string} pressName
   */
  setPressName(pressName) {
    this.setState({
      ...this.getState(),
      pressName,
    });
  }
}

export const unsubscriptionModalStore = new UnsubscriptionModalStore();
