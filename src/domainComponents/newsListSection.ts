import mockNews from "../../assets/mock_news.json";
import { renderNewsItem } from "./newsItem";

const NEWS_LIST_LENGTH = 24;
const NEWS_LIST_DATA = mockNews.slice(0, NEWS_LIST_LENGTH);

// 상태 관리
let currentTab = "all"; // "all" | "subscribed"
const subscribedPresses = new Set();

export function renderNewsListSection() {
	const sectionDOM = document.createElement("section");
	sectionDOM.className = "news-section";

	// 초기 렌더링 함수
	const render = () => {
		sectionDOM.innerHTML = ""; // 초기화 후 재렌더링

		// 1. 네비게이션 영역 (분리된 함수 호출)
		const navDOM = renderNewsNav(
			currentTab,
			subscribedPresses.size,
			(tab) => {
				currentTab = tab;
				render(); // 상태 변경 시 전체 재렌더링
			}
		);

		// 2. 뉴스 그리드 컨테이너
		const ulDOM = document.createElement("ul");
		ulDOM.className = "grid grid-cols-6 grid-rows-4 border-default";
		updateGrid(ulDOM);

		sectionDOM.append(navDOM, ulDOM);
	};

	render();
	return sectionDOM;
}

/**
 * 네비게이션(탭 및 뷰 전환) 렌더링 함수
 */
function renderNewsNav(activeTab, subscribedCount, onTabChange) {
	const nav = document.createElement("nav");
	nav.className = "flex flex-row justify-between items-center mb-4"; // 레이아웃 정렬

	// 왼쪽: 탭 메뉴
	const leftUl = document.createElement("ul");
	leftUl.className = "flex flex-row gap-6";

	// 전체 언론사 탭
	const allLi = document.createElement("li");
	const allA = document.createElement("a");
	allA.textContent = "전체 언론사";
	allA.className =
		activeTab === "all"
			? "selected-bold16 text-strong cursor-pointer"
			: "available-medium16 text-weak cursor-pointer";
	allA.onclick = () => onTabChange("all");
	allLi.appendChild(allA);

	// 내가 구독한 언론사 탭
	const subLi = document.createElement("li");
	subLi.className = "flex flex-row gap-1 items-center";
	const subA = document.createElement("a");
	subA.textContent = "내가 구독한 언론사 ";
	subA.className =
		activeTab === "subscribed"
			? "selected-bold16 text-strong cursor-pointer"
			: "available-medium16 text-weak cursor-pointer";
	subA.onclick = () => onTabChange("subscribed");

	// 구독 개수 배지 (HTML 구조 반영)
	if (subscribedCount > 0) {
		const badge = document.createElement("span");
		badge.className =
			"display-medium12 text-white-weak inline-flex bg-brand rounded-100 h-5 min-w-5 px-1.5 justify-center items-center";
		badge.textContent = subscribedCount;
		subA.appendChild(badge);
	}
	subLi.appendChild(subA);
	leftUl.append(allLi, subLi);

	// 오른쪽: 뷰 전환 버튼
	const rightUl = document.createElement("ul");
	rightUl.className = "flex flex-row gap-2";
	rightUl.innerHTML = `
        <li>
            <button class="none-style-btn" aria-label="목록 보기">
                <div class="icon icon-list-view bg-weak w-6 h-6"></div>
            </button>
        </li>
        <li>
            <button class="none-style-btn" aria-label="그리드 보기" aria-current="true">
                <div class="icon icon-grid-view bg-point w-6 h-6"></div>
            </button>
        </li>
    `;

	nav.append(leftUl, rightUl);
	return nav;
}

function updateGrid(container) {
	const displayData =
		currentTab === "all"
			? NEWS_LIST_DATA
			: NEWS_LIST_DATA.filter((news) =>
					subscribedPresses.has(news.press)
			  );

	if (displayData.length === 0 && currentTab === "subscribed") {
		container.innerHTML = `<div class="col-span-6 py-10 text-center text-gray-400">구독한 언론사가 없습니다.</div>`;
		return;
	}

	displayData.forEach((news) => {
		const newsItemDOM = renderNewsItem(news);
		enhanceWithSubscription(newsItemDOM, news.press, container);
		container.appendChild(newsItemDOM);
	});
}

function enhanceWithSubscription(liDOM, pressName, container) {
	liDOM.classList.add("news-item");

	// 호버 시 나타날 버튼
	const isSubscribed = subscribedPresses.has(pressName);
	const subscribeBtn = document.createElement("button");
	subscribeBtn.className = "subscribe-btn";
	subscribeBtn.textContent = isSubscribed ? "구독해지" : "+ 구독하기";

	subscribeBtn.onclick = (e) => {
		e.stopPropagation();
		if (subscribedPresses.has(pressName)) {
			subscribedPresses.delete(pressName);
		} else {
			subscribedPresses.add(pressName);
		}
		// 상태 변경 시 전체 섹션을 다시 그려서 배지 숫자를 업데이트함
		const section = container.closest(".news-section");
		if (section) {
			// 이 시점에서는 간단하게 updateGrid만 하거나,
			// 상위 렌더 함수를 다시 호출하도록 유도하는 것이 좋습니다.
			// 여기서는 성능을 위해 최상위 renderNewsListSection의 render 로직을 활용하는 구조가 유리합니다.
			const event = new CustomEvent("stateChanged");
			section.dispatchEvent(event);
		}
	};
	liDOM.appendChild(subscribeBtn);
}
