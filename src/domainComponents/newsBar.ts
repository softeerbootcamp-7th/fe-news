import {
	BrokerEventStatusInfo,
	DelayEventBroker,
} from "../domain/delayEventBroker.js";
import mockNews from "../../assets/mock_news.json";

const NEWS_BAR_COUNT = 2;
const NEWS_BAR_LIST_COUNT = 10;
const ALL_NEWS_DATA = mockNews.slice(0, NEWS_BAR_COUNT * NEWS_BAR_LIST_COUNT);

export function renderNewsBar() {
	const sectionDOM = document.createElement("section");
	const ulDOM = document.createElement("ul");
	ulDOM.className = "flex flex-row justify-between gap-2 w-f";

	// 각 뉴스 바가 현재 몇 번째 뉴스를 보여주고 있는지 관리하는 상태
	const barState = Array.from({ length: NEWS_BAR_COUNT }, () => ({
		currentDataIndex: 0,
	}));

	const tasks: { cb: () => BrokerEventStatusInfo }[] = [];

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

		tasks.push({
			cb: () => {
				const nextRelativeIndex =
					(barState[i].currentDataIndex + 1) % NEWS_BAR_LIST_COUNT;
				const globalIndex = offset + nextRelativeIndex;
				const nextData = ALL_NEWS_DATA[globalIndex];

				if (nextData) {
					agencyDOM.textContent = nextData.press;
					linkDOM.textContent = nextData.mainTitle;

					barState[i].currentDataIndex = nextRelativeIndex;
					return { is_fine: true };
				}
				return { is_fine: false };
			},
		});

		liDOM.addEventListener("mouseenter", () => newsRoller.pause());
		liDOM.addEventListener("mouseleave", () => newsRoller.resume());
	}

	const newsRoller = new DelayEventBroker({
		unitTime: 5000,
		interval: 1000,
		tasks: tasks,
	});

	newsRoller.start();

	sectionDOM.appendChild(ulDOM);
	return sectionDOM;
}
