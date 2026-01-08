export function createRollingArea(ul, headlines, { offset = 0 }) {
    // 현재 화면에 표시 중인 뉴스의 시작 인덱스
    // 항상 index, index + 1 두 개의 뉴스만 DOM에 유지
    let index = 0;

    // hover 상태 여부 (true 시 롤링 일시정지)
    let paused = false;

    // 초기 렌더링
    // DOM에는 항상 2개의 뉴스 아이템만 유지
    // 현재 뉴스, 다음에 보여질 뉴스
    function renderInitial() {
        ul.innerHTML = '';
        ul.appendChild(createItem(headlines[index]));
        ul.appendChild(createItem(headlines[index + 1]));
    }

    // 한번의 롤링 동작 수행
    // 1. 리스트를 위로 이동시키는 애니메이션 적용
    // 2. 애니메이션 종료 후
    //    - 첫 번째 아이템 제거
    //    - 인덱스 증가
    //    - 다음 뉴스 아이템 추가
    // 3. transform 초기화
    function roll() {
        if (paused) return;

        // 위로 올라가는 롤링 애니메이션
        ul.style.transition = 'transform 0.4s ease';
        ul.style.transform = `translateY(-50%)`;


        setTimeout(() => {
            // 애니메이션 종료 후 DOM 재정렬
            ul.style.transition = 'none';
            // 첫 번째 뉴스 제거
            ul.removeChild(ul.firstElementChild);
            // 다음 뉴스 인덱스로 이동 (무한 롤링)
            index = (index + 1) % headlines.length;
            // 새로운 뉴스 추가
            ul.appendChild(createItem(headlines[(index + 1) % headlines.length]));
            // 위치 초기화
            ul.style.transform = 'translateY(0)';
        }, 400);
    }

    // 전역 롤링 클락으로부터 호출되는 함수
    // 각 영역은 동일한 tick 이벤트를 받음
    // offset을 통해 실제 롤링 시점을 지연 > 좌우 롤링 탭의 시간차 유지
    function onTick() {
        setTimeout(roll, offset);
    }

    // hover 시 롤링 일시 정지 | 해제 시 롤링 복귀
    function pause() { paused = true; }
    function resume() { paused = false; }

    // 최초 렌더링 실행
    renderInitial();

    // 외부에 노출되는 API
    return { onTick, pause, resume };
}

// 뉴스 아이템 DOM 생성
function createItem(item) {
    const li = document.createElement('li');
    li.className = 'news-article';
    li.innerHTML = `
        <span class="press display-bold14">${item.press}</span>
        <a href="${item.link}" class="news-title available-medium14">
            ${item.title}
        </a>
    `;
    return li;
}