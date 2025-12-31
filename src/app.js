import './style.css'
import { newsData } from './data.js'

/**
 * TODO
 * - [week 1-1 레이아웃]
 * - 모듈 나누기
 * - 그리드 컨텐츠 없어도 레이아웃 유지되도록
 * - 그리드 페이지네이션 > 최대 4페이지
 * 
 * - [week 1-2 구독 및 롤링 기능]
 * - 구독 호버 레이아웃
 * - 구독 모달 레이아웃
 * - 구독 기능
 * - 롤링 뉴스 기능
 */

const ITEMS_PER_PAGE = 24
let currentPage = 1
let currentView = 'grid'

// 새로고침마다 데이터 섞기
// TODO: 최적화 고민
const shuffledData = [...newsData].sort(() => Math.random() - 0.5);

// 오늘 날짜 표시
function displayTodayDate() {
  const today = new Date()
  const formatted = today.toLocaleDateString('ko-KR', {
    weekday: "long",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const timeElement = document.querySelector('.header span')
  if (timeElement) {
    timeElement.textContent = formatted
  }
}

// 페이지 데이터 가져오기
function getPaginatedData(page) {
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return shuffledData.slice(start, end)
}

// 총 페이지 수 계산
function getTotalPages() {
  return Math.ceil(shuffledData.length / ITEMS_PER_PAGE)
}

// 그리드 렌더링
function renderGridView(data) {
  const content = document.getElementById('content')
  content.className = 'grid'
  content.innerHTML = ''

  data.forEach(item => {
    const gridItem = document.createElement('li')
    gridItem.className = 'grid-item'
    gridItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="grid-item-image">
    `
    content.appendChild(gridItem)
  })
}

// 리스트 렌더링
function renderListView(data) {
  const content = document.getElementById('content')
  content.className = 'list'
  content.innerHTML = ''

  data.forEach(item => {
    const listItem = document.createElement('div')
    listItem.className = 'list-item'
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="list-item-image">
      <div class="list-item-content">
        <div>
          <h3 class="list-item-title">${item.title}</h3>
          <p class="list-item-description">${item.description}</p>
        </div>
        <div class="list-item-meta">
          <span class="list-item-date">${item.date}</span>
        </div>
      </div>
    `
    content.appendChild(listItem)
  })
}

// 페이지네이션 버튼 업데이트
function updatePaginationButtons() {
  const totalPages = getTotalPages()
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const currentPageSpan = document.getElementById('current-page')
  const totalPagesSpan = document.getElementById('total-pages')

  prevBtn.disabled = currentPage === 1
  nextBtn.disabled = currentPage === totalPages
  currentPageSpan.textContent = currentPage
  totalPagesSpan.textContent = totalPages
}

// 페이지 렌더링
function renderPage(page) {
  currentPage = page
  const pageData = getPaginatedData(page)
  
  if (currentView === 'grid') {
    renderGridView(pageData)
  } else {
    renderListView(pageData)
  }
  
  updatePaginationButtons()
}

// 뷰 전환
function switchView(viewType) {
  currentView = viewType
  currentPage = 1
  
  // 탭 활성화 상태 업데이트
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewType)
  })
  
  // 첫 페이지 렌더링
  renderPage(1)
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  displayTodayDate()
  switchView('grid')
  
  // 탭 버튼 이벤트
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view)
    })
  })

  // 페이지네이션 버튼 이벤트
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      renderPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })

  document.getElementById('next-btn').addEventListener('click', () => {
    const totalPages = getTotalPages()
    if (currentPage < totalPages) {
      renderPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
  
  document.querySelector('#logo').addEventListener('click', () => {
    location.reload()
  })
})
