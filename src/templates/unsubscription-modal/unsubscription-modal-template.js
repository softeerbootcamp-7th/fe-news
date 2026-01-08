/**
 * @typedef {Object} UnsubscriptionModalTemplateParams
 * @property {string} pressName
 *
 * @returns {string}
 */

export const unsubscriptionModalTemplate = ({ pressName }) => {
  return `
  <div class="unsubscription-modal__overlay"></div>
  <div class="unsubscription-modal" tabindex="0">
  <div class="unsubscription-modal__content__wrapper">
    <p class="unsubscription-modal__content">
      <span class="unsubscription-modal__content--press-name">${pressName}</span>을(를)
      <br />
      구독해지하시겠습니까?
    </p>
  </div>
  <div class="unsubscription-modal__buttons">
    <button class="unsubscription-modal__buttons--accept">예, 해지합니다</button>
    <button class="unsubscription-modal__buttons--reject">아니오</button>
  </div>
</div>
  `;
};
