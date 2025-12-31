// src/components/Header.js
export const Header = () => {
  const formatter = new Intl.DateTimeFormat("ko-KR", { weekday: "long" });
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const weekday = formatter.format(currentDate);

  return `
    <header>
      <span class="display-bold24 title"><i class="icon-news"></i> 뉴스스탠드</span>
      <span class="display-medium16">${dateString} ${weekday}</span>
    </header>
  `;
};
