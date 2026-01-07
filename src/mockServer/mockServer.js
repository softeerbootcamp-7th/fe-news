/**
 * 특정 언론사의 상세 데이터를 가져오는 함수
 * @param {string} pressName
 * @returns {Promise} 해당 언론사의 데이터 객체
 */
export const fetchNewsListOfOnePress = async ({ pressName }) => {
  // 1. fetch는 Promise를 반환하므로 반드시 앞에 return을 붙여야 밖에서 then을 쓸 수 있습니다.
  return await fetch("./newsOfPress.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }
      return response.json();
    })
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
