export function getTodayString() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');

    const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const day = days[today.getDay()];

    return `${year}. ${month}. ${date}. ${day}`;
}