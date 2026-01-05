import { articlesData } from "@/dummy/articlesData";
import { getGridItemPressTemplate } from "@/template/GridItem";

function parsePressData(data) {
  return data.slice(0, 24).map((item, index) => ({
    index: index,
    logo: item.logo,
    name: item.press,
  }));
}

export function initGridView() {
  const gridContainer = document.querySelector(".press-grid__list");

  // dummy 데이터 파싱
  const pressData = parsePressData(articlesData);
  let gridContentHTML = "";

  pressData.map((item) => {
    // grid item template
    gridContentHTML += getGridItemPressTemplate({
      imgSrc: item.logo,
      imgAlt: item.name,
      isSubscribed: false, // TODO
    });
  });
  gridContainer.innerHTML = gridContentHTML;
}
