import { rollingNewsCard } from "./rollingNewsCard";

export const rolling = () => {
  const rollingWrapper = document.createElement("section");
  rollingWrapper.id = "roll-wrapper";

  rollingWrapper.append(
    rollingNewsCard({
      title: "연합뉴스",
      text: "[속보] 도심 공원 ‘조용한 독서존’ 시범 운영… 시민 호응 이어져",
    })
  );
  rollingWrapper.append(
    rollingNewsCard({
      title: "서울경제",
      text: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    })
  );

  return rollingWrapper;
};
