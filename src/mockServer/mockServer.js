import { tabNames } from "../store";
import data from "./newsOfPress.json"; // Vite가 JSON을 자동으로 객체로 변환해줍니다.

export const fetchPressListPerCategory = async () => {
  try {
    const newsList = data.newsList; // fetch 과정 없이 바로 데이터 접근

    const result = tabNames.map((currTab) => ({
      category: currTab,
      pressIdList: newsList
        .filter((press) => press.category === currTab)
        .map((press) => press.id),
    }));

    return result;
  } catch (error) {
    console.error("데이터 처리 에러:", error);
  }
};

/**
 * 특정 언론사의 상세 데이터를 가져오는 함수
 * @param {string} pressName
 * @returns {Promise} 해당 언론사의 데이터 객체
 */
export const fetchNewsListOfOnePress = async (pressId) => {
  try {
    const newsList = data.newsList;
    const pressData = newsList.find((n) => n.id === pressId);
    if (!pressData)
      throw new Error(
        `해당 언론사를 찾을 수 없습니다. 언론사 id: [${pressId}]`
      );
    return pressData;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
