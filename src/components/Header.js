export function Header({ title }) {
  const formatter = new Intl.DateTimeFormat("ko-KR", { weekday: "long" });
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const weekday = formatter.format(currentDate);

  return `
    <header class="flex justify-between">
     <div class="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="/assets/icons/newspaper.svg"/>
        </svg>
        <span class="display-bold24 text-strong">${title}</span>
      </div>
      <span class="display-medium16">${dateString} ${weekday}</span>
    </header>
  `;
}
