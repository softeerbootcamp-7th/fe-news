// 날짜를 렌더링하는 컴포넌트입니다.

const DAY_OF_WEEK = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export const renderDay = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const day = DAY_OF_WEEK[today.getDay()];

  const element = document.querySelector('time');
  element.dateTime = `${year}-${month + 1}-${date}`; // 유효한 시간범위입니다.
  element.textContent = `${year}. ${month + 1}. ${date}. ${day}`;
};
