export const cleanupEventListenerMap = new WeakMap();

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // DOM에서 일어난 모든 변경들에 대해 탐색
    mutation.removedNodes.forEach((node) => {
      // 삭제된 노드의 이벤트 리스너 삭제. 삭제된 노드가 콜백함수를 등록하지 않았으면 그냥 넘어감
      if (cleanupEventListenerMap.node) {
        cleanupEventListenerMap.get(node)(); //node를 KEY로 가지는 callback 함수 실행 -> 이벤트리스너 지우는 콜백함수
        cleanupEventListenerMap.delete(node); //제 할일을 다 했으니 WeakMap에서 삭제
      }

      // 삭제된 노드의 자식이 이벤트 리스너를 등록했다면, 그것도 지우기
      if (node.querySelectorAll) {
        node.querySelectorAll("*").forEach((child) => {
          //위의 동작과 동일
          if (cleanupEventListenerMap.has(child)) {
            cleanupEventListenerMap.get(child)();
            cleanupEventListenerMap.delete(child);
          }
        });
      }
    });
  }
});

export const startEventRemovingObserver = () => {
  observer.observe(document.body, { childList: true, subtree: true });
};
