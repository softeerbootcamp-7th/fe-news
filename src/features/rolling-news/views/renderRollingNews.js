// 애니메이션을 리플로우 없이 재시작하도록 처리
function restartAnimationNoReflow(wrapper) {
  const flip = wrapper.dataset.flip === "1";
  wrapper.dataset.flip = flip ? "0" : "1";

  wrapper.style.animation = `${flip ? "rolling-slide-up-a" : "rolling-slide-up-b"} 0.5s ease`;
}

export function renderRollingNews(columnId, currentIndex, data) {
  const column = document.getElementById(columnId)
  if (!column) return currentIndex

  const wrapper = column.querySelector('.rolling-wrapper')
  const items = Array.isArray(data) ? data : []
  const itemLen = items.length
  if (!wrapper || !itemLen) return currentIndex

  const idx = ((currentIndex % itemLen) + itemLen) % itemLen
  const nextIdx = (idx + 1) % itemLen

  const cur = items[idx]
  const nxt = items[nextIdx]

  // 뉴스 내용 텍스트 업데이트
  const rows = wrapper.querySelectorAll('div > div')
  rows[0].querySelector('span').textContent = cur.press
  rows[0].querySelector('p').textContent = cur.description
  rows[1].querySelector('span').textContent = nxt.press
  rows[1].querySelector('p').textContent = nxt.description

  // 애니메이션 재시작
  restartAnimationNoReflow(wrapper);

  wrapper.addEventListener('animationend', () => {
    const afterIdx = (idx + 1) % itemLen
    const afterNextIdx = (afterIdx + 1) % itemLen
    const afterCur = items[afterIdx] || {}
    const afterNext = items[afterNextIdx] || {}

    rows[0].querySelector('span').textContent = afterCur.press
    rows[0].querySelector('p').textContent = afterCur.description
    rows[1].querySelector('span').textContent = afterNext.press
    rows[1].querySelector('p').textContent = afterNext.description

    wrapper.style.animation = 'none'
  }, { once: true })

  return nextIdx
}