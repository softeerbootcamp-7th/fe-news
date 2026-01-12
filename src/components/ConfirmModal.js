export const ConfirmModal = ({ pressName, onConfirm, onCancel }) => {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "confirm-modal";

  const modal = document.createElement("div");
  modal.className = "modal-container";

  const title = document.createElement("div");
  title.className = "modal-title";
  title.innerHTML = `
    <p>
      <span style="font-weight: bold;">${pressName}</span>을(를)
    </p>
    <p>구독해지하시겠습니까?</p>
  `;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "modal-button-container";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "modal-button modal-button-secondary";
  cancelBtn.textContent = "예, 해지합니다";
  cancelBtn.onclick = (e) => {
    e.stopPropagation();
    onConfirm();
    overlay.remove();
  };

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "modal-button modal-button-primary";
  confirmBtn.textContent = "아니오";
  confirmBtn.onclick = (e) => {
    e.stopPropagation();
    onCancel();
    overlay.remove();
  };

  buttonContainer.appendChild(cancelBtn);
  buttonContainer.appendChild(confirmBtn);

  modal.appendChild(title);
  modal.appendChild(buttonContainer);
  overlay.appendChild(modal);

  // 오버레이 클릭 시 닫기
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      onCancel();
      overlay.remove();
    }
  };

  return overlay;
};
