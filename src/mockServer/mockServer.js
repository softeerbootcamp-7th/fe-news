import { tabNames } from "../store";
import data from "./newsOfPress.json"; // Vite가 JSON을 자동으로 객체로 변환해줍니다.

export const fetchPressListPerCategory = async () => {
  try {
    const newsList = data.newsList; // fetch 과정 없이 바로 데이터 접근

    const result = tabNames.map((currTab) => ({
      category: currTab,
      pressNames: newsList
        .filter((press) => press.category === currTab)
        .map((press) => press.pressName),
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
    const pressData = newsList.find((n, index) => index === pressId);
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

/**
 * 카테고리별 언론사 목록을 가져오는 함수
 * @param none
 * @returns {Promise} 카테고리별 언론사 데이터 객체
 */
// export const fetchPressListPerCategory = async () => {
//   return await fetchRawJson()
//     .then((data) => {
//       const newsList = data.newsList;

//       // tabNames 배열을 기반으로 새로운 객체 배열 생성
//       const result = tabNames.map((currTab) => {
//         return {
//           category: currTab,
//           // 해당 카테고리에 속하는 언론사의 '이름'만 추출해서 배열로 만듦
//           pressNames: newsList
//             .filter((press) => press.category === currTab)
//             .map((press) => press.pressName),
//         };
//       });

//       return result;
//     })
//     .catch((error) => {
//       console.error("API Error:", error);
//       throw error;
//     });
// };
