// 리스트, 그리드 전환
// 리스트는 미구현으로 실제 전환기능 없음
// 아이콘 색깔 변경 작업만 존재

import { initGrid } from './grid/gridController.js';
import { initList } from './list/listController.js';

let listView, gridView, viewElement;

export function initViewTabs({listId, gridId}) {
    const tabs = document.querySelectorAll('.view-tab');    // class로 view-tab을 가진 DOM들 지정
    listView = document.getElementById(listId);
    gridView = document.getElementById(gridId);
    
    viewElement = document.getElementById('newsGrid');

    // 리스트 실행
    listView.addEventListener('click', () => {
        // 리스트 렌더링
        viewElement.classList.remove('active-grid');
        viewElement.classList.add('active-list');
        initList({
            viewId: 'newsGrid',
            prevBtnId: 'prevBtn', // 이전 페이지 버튼
            nextBtnId: 'nextBtn'  // 다음 페이지 버튼
        });
    });

    // 그리드 실행
    gridView.addEventListener('click', () => {
        // 그리드 렌더링
        viewElement.classList.remove('active-list');
        viewElement.classList.add('active-grid');
        initGrid({
            viewId: 'newsGrid',   // 그리드
            prevBtnId: 'prevBtn', // 이전 페이지 버튼
            nextBtnId: 'nextBtn'  // 다음 페이지 버튼
        });
    });

    // 선택한 DOM에 active 설정
    tabs.forEach(tab => {                                       // view-tab을 지닌 각 DOM들에 대해서
        tab.addEventListener('click', () => {                   // EventListener로 클릭 시 이벤트 부여
            tabs.forEach(t => t.classList.remove('active'));    // view-tab 클래스를 지닌 모든 DOM에서 active 클래스 삭제
            tab.classList.add('active');                        // 선택한 DOM만 active 클래스 부여
        });
    });
}