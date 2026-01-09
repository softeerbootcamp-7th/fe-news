// fisher-yates 방식 셔플
// idx는 배열의 맨 뒤부터 앞으로 진행
// 아직 섞이지 않은 앞 구간(0~(idx-1))에서 랜덤으로 하나 뽑아 idx번째 요소랑 교환. 그러면 idx 번째 요소는 결정된 것
// 모든 idx에 대해 위 작업 반복
export default function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
