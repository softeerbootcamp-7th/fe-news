import { ITEMS_PER_PAGE } from '../../../constants/constants.js'
import { subscription } from '../../../utils/subscription.js'
import { modal } from '../../../utils/modal.js'

// TODO: image -> logo, title -> press, id -> press 로 변경 필요
function gridViewTemplate(item){
  const subscribed = subscription.isSubscribed(item.press)
  return `
    <li class="grid-item">
      <img src="${item.logo}" alt="${item.press}" class="grid-item-image">
      <div class="grid-item-overlay">
        <button class="subscribe-btn ${subscribed ? 'subscribed' : ''}" data-id="${item.id}" data-press="${item.press}">
          ${subscribed ? '해지하기' : '구독하기'}
        </button>
      </div>
    </li>
  `
}

// [TODO] 모달 테스트 중 구조 수정 필요
// - 구독/해지하기 버튼 컴포넌트화
// - 상태에 따른 버튼 css 확인해보기
function onClickSubscribe(e) {
  const btn = e.target.closest('.subscribe-btn')
  if (!btn) return

  e.stopPropagation()
  
  const itemId = btn.dataset.id
  const itemPress = btn.dataset.press
  const isSubscribed = subscription.isSubscribed(itemId)

  modal.open()
  const modalBox = document.querySelector('.modal-content')
  const modalTitle = document.createElement('h3')
  modalTitle.className = 'typo-display-bold-16'
  modalTitle.innerText = isSubscribed ? `${itemPress}를\n구독해지하시겠습니까?` : `${itemPress}를\n구독하시겠습니까?`
  const buttonContainer = document.createElement('div')
  const okButton = document.createElement('button')
  const cancelButton = document.createElement('button')
  okButton.textContent = isSubscribed ? '네, 해지합니다.' : '네, 구독합니다.'
  okButton.addEventListener('click', () => {
    btn.textContent = isSubscribed ? '구독하기' : '해지하기'
    btn.classList.toggle('subscribed', isSubscribed)
    subscription.toggle(itemId)
    modal.close()
  })
  cancelButton.textContent = '아니요'
  cancelButton.addEventListener('click', () => {
    modal.close()
  })
  buttonContainer.appendChild(okButton)
  buttonContainer.appendChild(cancelButton)
  modalBox.innerHTML = ''
  modalBox.appendChild(modalTitle)
  modalBox.appendChild(buttonContainer)
}

export function renderGridView(items) {
  const content = document.getElementById('news-contents')
  if (!content) return

  content.className = 'grid'

  const gridItems = items.map(gridViewTemplate).join('')

  const placeholdersCount = Math.max(0, ITEMS_PER_PAGE - items.length)
  const placeholderTemplate = `<li class="grid-item placeholder" aria-hidden="true"></li>`
  const placeholderItems = placeholderTemplate.repeat(placeholdersCount)
  
  content.innerHTML = gridItems + placeholderItems

  content.addEventListener('click', onClickSubscribe)
}
