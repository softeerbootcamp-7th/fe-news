// 리스트, 그리드 전환
// 리스트는 미구현으로 실제 전환기능 없음
// 아이콘 색깔 변경 작업만 존재
export function initViewTabs() {
    const tabs = document.querySelectorAll('.view-tab');    // class로 view-tab을 가진 DOM들 지정

    // 선택한 DOM에 active 설정
    tabs.forEach(tab => {                                       // view-tab을 지닌 각 DOM들에 대해서
        tab.addEventListener('click', () => {                   // EventListener로 클릭 시 이벤트 부여
            tabs.forEach(t => t.classList.remove('active'));    // view-tab 클래스를 지닌 모든 DOM에서 active 클래스 삭제
            tab.classList.add('active');                        // 선택한 DOM만 active 클래스 부여
        });
    });
}