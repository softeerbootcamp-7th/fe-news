import { getNewsCategoryList, getPressData } from "../../data/fetchPressData.js";

export const renderList = async (container) => {
    container.innerHTML = `<div class="news-list-container">
                        <ul class="category-tab-container"></ul>
                        <div class="category-news-container"></div>
                     </div>`

    const pressData = await getPressData();
    const newsCategory = getNewsCategoryList(pressData);

    const categoryTabContainer = document.querySelector('.category-tab-container');
    newsCategory.forEach((category, index) => {
        const categoryTabItem = document.createElement('li');
        categoryTabItem.className = `category-tab-item${index === 0 ? " selected" : ""}`;

        const spanEl = document.createElement('span');
        spanEl.className = 'category-name';
        spanEl.textContent = category
        categoryTabItem.appendChild(spanEl);

        categoryTabItem.addEventListener('click', (e) => {
            const newSelectedTab = e.currentTarget;
            const selectedTab = document.querySelector('.category-tab-item.selected');
            toggleCountText(selectedTab, false);
            toggleCountText(newSelectedTab, true);
        })

        if (index === 0) addCountText(categoryTabItem);

        categoryTabContainer.appendChild(categoryTabItem);
    })

    addNewsMainContent();
}

const toggleCountText = (el, isAddText) => {
    el.classList.toggle('selected');
    if (!isAddText) {
        const categoryCountContainer = document.querySelector(".category-count-container");
        categoryCountContainer?.remove();
        
        return;
    }
    addCountText(el);
}

const addCountText = (container) => {
    const categoryCountContainer = document.createElement('div');
    categoryCountContainer.className = "category-count-container";
    container.appendChild(categoryCountContainer);

    const currentCnt = 1
    const totalCnt = 10

    categoryCountContainer.innerHTML = `
                                    <span class="current-count">${currentCnt}</span>
                                    <span>/</span>
                                    <span class="total-count">${totalCnt}</span>`
}

const addNewsMainContent = () => {
    const newsMainContent = `<a class="news-info-container">
                                <img src="https://placehold.co/52x20" />
                                <span class="news-info">2026.01.14. 19:38 편집</span>
                            </a>
                            <div class="news-main-container">
                                <div class="img-section">
                                    <img src="https://placehold.co/320x200" />
                                    <span class="img-caption">기업, ‘워라밸 교육 프로그램’ 자율 도입 확대</span>
                                </div>
                                <div class="news-title-section">
                                    <ul class="news-title-list">
                                        <li class="news-title-item">지자체, 소상공인 대상 친절 응대 교육 지원</li>
                                        <li class="news-title-item">직장인 스트레스 관리 위한 ‘마음건강 상담’ 확대</li>
                                        <li class="news-title-item">생활밀착 스타트업, 직장인 대상 서비스 잇단 출시</li>
                                        <li class="news-title-item">기업문화 개선 사례 공유 확산… 자발적 참여 늘어</li>
                                        <li class="news-title-item">재택·출근 혼합 근무, 중견기업까지 확대 움직임</li>
                                        <li class="news-title-item">사내 커뮤니케이션 플랫폼 고도화 추진</li>
                                    </ul>
                                    <span class="news-caption">아주경제 언론사에서 직접 편집한 뉴스입니다.</span>
                                </div>
                            </div>`
    const categoryNewsContainer = document.querySelector('.category-news-container');
    categoryNewsContainer.innerHTML = newsMainContent;
}