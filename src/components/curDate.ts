const WEEK = [
	"일요일",
	"월요일",
	"화요일",
	"수요일",
	"목요일",
	"금요일",
	"토요일",
];

export function renderCurDate() {
	const timeDOM = document.createElement("time");
	timeDOM.className = "display-medium16 text-default";

	const updateTime = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");

		const dayOfWeek = WEEK[now.getDay()];

		timeDOM.textContent = `${year}.${month}.${day}. ${dayOfWeek}`;
	};

	updateTime();
	setInterval(updateTime, 1000);

	return timeDOM;
}
