// 날짜 출력
export function renderCurrentDate(targetId) {                 // targetId: 렌더링 할 html요소의 ID
  const now = new Date();

  const year = now.getFullYear();                             // 년
  const month = String(now.getMonth() + 1).padStart(2, '0');  // 월, 한자리 수일때 0N 형태로 출력
  const date = String(now.getDate()).padStart(2, '0');        // 일, 한자리 수일때 0N 형태로 출력

  const dayNames = ['일','월','화','수','목','금','토'];  // 인덱스에 따른 요일
  const day = dayNames[now.getDay()];                   // 요일 데이터에 따른 요일 지정

  const target = document.getElementById(targetId); // 렌더할 요소의 ID 지정
  if (!target) return;                              // 해당하는 html요소가 없으면 반환

  target.textContent = `${year}. ${month}. ${date}. ${day}요일`;  // 렌더용 html의 text 변환
}