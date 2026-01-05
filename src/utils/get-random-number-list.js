/**
 * @description 0 ~ 최대 숫자 랜덤 숫자 생성
 * @param {number} max
 * @param {number} count
 * @returns {number} 랜덤 숫자
 */
export const getRandomNumberList = ({ max, count }) => {
  const randomNumberSet = new Set();
  while (randomNumberSet.size < count) {
    const randomNumber = new Uint32Array(1);
    self.crypto.getRandomValues(randomNumber);
    randomNumberSet.add(randomNumber % (max + 1));
  }
  return Array.from(randomNumberSet);
};
