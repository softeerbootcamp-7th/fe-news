export function createRollingClock(interval) {
    // 롤링 클락에 등록된 롤링 영역 (onTick 함수들)
    let subscribers = [];
    // 전역 롤링 주기를 관리할 타이머 ID
    let timerId = null;

    // 롤링 클락 시작
    // 기존 타이머가 있으면 제거하여 중복 실행 방지
    // interval 주기마다 모든 구독자에게 tick 이벤트 전달
    function start() {
        stop();
        timerId = setInterval(() => {
            // 현재 시점을 기준으로 각 롤링 영역에 신호 전달
            const now = Date.now();
            subscribers.forEach(fn => fn(now));
        }, interval);
    }

    // 롤링 클락 중지
    // 개별 롤링 영역의 pause와 별개로 클락 자체를 완전히 멈출 때 사용
    function stop() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    // 롤링 영역 등록
    // 각 롤링 탭의 onTick 함수를 전달받아 저장
    // 시간 이벤트 구독 역할
    function subscribe(fn) {
        subscribers.push(fn);
    }

    // 클락 생성과 동시에 즉시 시작
    // 모든 롤링 탭이 동일한 기준 시간에서 동작
    start();

    // 외부에는 구독 기능만 노출
    return { subscribe };
}