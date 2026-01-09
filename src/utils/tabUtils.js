/**
 * 텍스트 탭의 선택 상태에 따라 스타일을 업데이트
 * @param {string} tabGroupName - data-tab-group 속성 값
 * @param {string} selectedValue - 현재 선택된 탭의 값
 */
export const updateTextTabStyles = (tabGroupName, selectedValue) => {
  const tabItems = document.querySelectorAll(
    `[data-tab-group="${tabGroupName}"][data-tab-type="text"]`
  );

  tabItems.forEach((tab) => {
    const { tabItem } = tab.dataset;
    const isSelected = tabItem === selectedValue;

    tab.classList.toggle("text-strong", isSelected);
    tab.classList.toggle("selected-bold16", isSelected);
    tab.classList.toggle("text-weak", !isSelected);
    tab.classList.toggle("available-medium16", !isSelected);
  });
};

/**
 * 아이콘 탭의 선택 상태에 따라 스타일을 업데이트
 * @param {string} tabGroupName - data-tab-group 속성 값
 * @param {string} selectedValue - 현재 선택된 탭의 값
 */
export const updateIconTabStyles = (tabGroupName, selectedValue) => {
  const tabItems = document.querySelectorAll(
    `[data-tab-group="${tabGroupName}"][data-tab-type="icon"]`
  );

  tabItems.forEach((tab) => {
    const { tabItem } = tab.dataset;
    const isSelected = tabItem === selectedValue;

    const svg = tab.querySelector("svg");
    if (svg) {
      svg.classList.toggle("fill-strong", isSelected);
      svg.classList.toggle("fill-weak", !isSelected);
    }
  });
};
