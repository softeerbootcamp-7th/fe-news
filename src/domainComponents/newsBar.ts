import mockNews from "../../assets/mock_news.json";

type CreateRollingTimer = {
	count: number;
	unitTime: number; // ms
	interval: number; // ms
	callbacks: Function[];
};

const createRollingTimer = ({
	count,
	unitTime,
	interval,
	callbacks,
}: CreateRollingTimer) => {
	const rollingInfoStates = Array.from({ length: count }, (_, i) => ({
		isOn: true,
		callback: callbacks[i],
		currentIndex: 0,
	}));

	const startRolling = () => {
		setInterval(() => {
			rollingInfoStates.forEach((rollingInfoState, index) => {
				setTimeout(() => {
					if (!rollingInfoState.isOn) return;

					rollingInfoState.currentIndex =
						(rollingInfoState.currentIndex + 1) % 10;
					rollingInfoState.callback(rollingInfoState.currentIndex);
				}, index * interval);
			});
		}, unitTime);
	};

	return {
		start: startRolling,
		setOn: (index: number) => {
			if (rollingInfoStates[index]) rollingInfoStates[index].isOn = true;
		},
		setOff: (index: number) => {
			if (rollingInfoStates[index]) rollingInfoStates[index].isOn = false;
		},
	};
};

/**
 * 롤링되는 뉴스 섹션의 개수
 */
const NEWS_BAR_COUNT = 2;

/**
 *  각 롤링 뉴스 섹션에서 사용할 뉴스의 개수
 */
const NEWS_BAR_LIST_COUNT = 10;

const ALL_NEWS_DATA = mockNews.slice(0, NEWS_BAR_COUNT * NEWS_BAR_LIST_COUNT);

export function renderNewsBar() {
	const sectionDOM = document.createElement("section");
	const ulDOM = document.createElement("ul");
	ulDOM.className = "flex flex-row justify-between gap-2 w-f";

	const updateCallbacks = [];

	for (let i = 0; i < NEWS_BAR_COUNT; i++) {
		const offset = i * NEWS_BAR_LIST_COUNT;
		const initialData = ALL_NEWS_DATA[offset];

		const liDOM = document.createElement("li");
		liDOM.className =
			"flex border-default bg-alt p-4 w-f gap-2 items-center";

		const agencyDOM = document.createElement("span");
		agencyDOM.className = "display-bold14 uncut text-strong";
		agencyDOM.textContent = initialData.press;

		const linkDOM = document.createElement("a");
		linkDOM.className = "available-medium14 text-default line-eclipse";
		linkDOM.textContent = initialData.mainTitle;
		linkDOM.href = "#";

		liDOM.append(agencyDOM, linkDOM);
		ulDOM.appendChild(liDOM);

		// UI를 업데이트하는 콜백 함수 정의
		const updateUI = (relativeIndex: number) => {
			const index = offset + relativeIndex;
			const nextData = ALL_NEWS_DATA[index];
			if (nextData) {
				agencyDOM.textContent = nextData.press;
				linkDOM.textContent = nextData.mainTitle;
			}
		};
		updateCallbacks.push(updateUI);

		// 호버 이벤트 등록
		liDOM.addEventListener("mouseenter", () => rollingControl.setOff(i));
		liDOM.addEventListener("mouseleave", () => rollingControl.setOn(i));
	}

	const rollingControl = createRollingTimer({
		count: NEWS_BAR_COUNT,
		unitTime: 5000,
		interval: 1000,
		callbacks: updateCallbacks,
	});

	rollingControl.start();

	sectionDOM.appendChild(ulDOM);
	return sectionDOM;
}
