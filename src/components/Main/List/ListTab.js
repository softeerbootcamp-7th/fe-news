export function ListTab(tabName, isActive) {
  const currentNum = 1;
  const totalNum = 10;
  return `
        <div class="list-tab ${isActive ? "active" : ""}">
            ${tabName}
            ${isActive ? `<span>${currentNum}/${totalNum} </span>` : ""}
        </div>
    `;
}
