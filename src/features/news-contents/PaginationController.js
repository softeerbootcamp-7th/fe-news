export function updatePaginationButtons({
  currentPage,
  totalPages,
  prevSelector = '#prev-btn',
  nextSelector = '#next-btn',
  currentPageSelector = '#current-page',
  totalPagesSelector = '#total-pages'
}) {
  const prevBtn = document.querySelector(prevSelector)
  const nextBtn = document.querySelector(nextSelector)
  const currentPageSpan = document.querySelector(currentPageSelector)
  const totalPagesSpan = document.querySelector(totalPagesSelector)

  if (prevBtn) prevBtn.disabled = currentPage === 1
  if (nextBtn) nextBtn.disabled = currentPage === totalPages
  if (currentPageSpan) currentPageSpan.textContent = currentPage
  if (totalPagesSpan) totalPagesSpan.textContent = totalPages
}

export function attachPaginationEvents({
  onPrev,
  onNext,
  prevSelector = '#prev-btn',
  nextSelector = '#next-btn'
}) {
  const prevBtn = document.querySelector(prevSelector)
  const nextBtn = document.querySelector(nextSelector)

  if (prevBtn && onPrev) {
    prevBtn.addEventListener('click', onPrev)
  }

  if (nextBtn && onNext) {
    nextBtn.addEventListener('click', onNext)
  }
}
