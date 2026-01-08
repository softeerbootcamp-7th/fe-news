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
const fetchRawJson = async () => {
  return await fetch("/newsOfPress.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다");
      }
      console.log(response);
      return response.json(); // 응답 데이터를 JSON으로 변환해서 반환해야 함!
    })
    .catch((error) => {
      console.error("data fetch Error:", error);
      throw error;
    });
};

/**
 * 특정 언론사의 상세 데이터를 가져오는 함수
 * @param {string} pressName
 * @returns {Promise} 해당 언론사의 데이터 객체
 */
export const fetchNewsListOfOnePress = async ({ pressName }) => {
  // 1. fetch는 Promise를 반환하므로 반드시 앞에 return을 붙여야 밖에서 then을 쓸 수 있습니다.
  return await fetchRawJson()
    .then((data) => {
      // 2. 전체 리스트에서 pressName이 일치하는 '단 하나'의 객체를 찾습니다.
      const targetNews = data.newsList.find((p) => p.pressName === pressName);

      if (!targetNews) {
        throw new Error(`[${pressName}] 언론사를 찾을 수 없습니다.`);
      }

      return targetNews; // 찾은 데이터(객체)를 반환
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error; // 에러를 위로 던져서 호출하는 쪽에서도 알 수 있게 함
    });
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
