export function Header({ title }) {
  const formatter = new Intl.DateTimeFormat("ko-KR", { weekday: "long" });
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const weekday = formatter.format(currentDate);

  return `
    <header class="flex justify-between">
      <span class="display-bold24 text-strong"><i class="icon-news"></i>${title}</span>
      <span class="display-medium16">${dateString} ${weekday}</span>
    </header>
  `;
}
