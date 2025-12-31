import "./Alert.css";

export function Alert(press, subscribed) {
  return `<div class="alert-modal">
        <div class="alert-content">
        <a class="alert-message">
            <strong>${press}</strong>
            을(를)<br/>구독${subscribed ? "해지" : ""}하시겠습니까?
        </a>
        </div>
        <div class="alert-actions">
            <button class="alert-btn confirm-btn">예, ${
              subscribed ? "해지" : "구독"
            }합니다.</button>
            <button class="alert-btn cancel-btn">아니오</button>
        </div>      
    </div>`;
}
