export function displayTodayDate(selector = '.header span') {
  const target = document.querySelector(selector)
  if (!target) return

  const today = new Date()
  const formatted = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  target.textContent = formatted
}
