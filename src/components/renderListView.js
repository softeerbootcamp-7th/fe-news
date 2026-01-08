export const renderList = (container) => {
    // TODO: fetch json data

    container.innerHTML = `<div class="news-list-container">
                        <ul class="category-tab-container">
                            <li class="category-tab-item selected">종합/경제</li>
                            <li class="category-tab-item">IT</li>
                            <li class="category-tab-item">영자지</li>
                            <li class="category-tab-item">방송/통신</li>
                            <li class="category-tab-item">스포츠/연예</li>
                            <li class="category-tab-item">매거진/전문지</li>
                            <li class="category-tab-item">지역</li>
                        </ul>
                        <div class="category-news-container">
                            <div class="news-info-container">
                                <img src="https://placehold.co/52x20" />
                                <span class="news-info">2026.01.14. 19:38 편집</span>
                            </div>
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
                            </div>
                        </div>
                     </div>`
}