// SubscriptionManager - 옵저버 패턴의 Subject 역할
class SubscriptionManager {
    constructor() {
        this.observers = [];
        this.subscriptions = new Set(); // 구독한 언론사 ID 저장
    }

    // Observer 등록
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Observer 제거
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // 모든 Observer에게 알림
    notify(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }

    // 구독 추가
    addSubscription(pressId) {
        if (this.subscriptions.has(pressId)) {
            return;
        }
        
        this.subscriptions.add(pressId);
        this.notify('subscribe', {
            pressId,
            count: this.subscriptions.size
        });
    }

    // 구독 제거
    removeSubscription(pressId) {
        if (!this.subscriptions.has(pressId)) {
            return;
        }
        
        this.subscriptions.delete(pressId);
        this.notify('unsubscribe', {
            pressId,
            count: this.subscriptions.size
        });
    }

    // 구독 상태 확인
    isSubscribed(pressId) {
        return this.subscriptions.has(pressId);
    }

    // 구독 개수 반환
    getSubscriptionCount() {
        return this.subscriptions.size;
    }

    // 모든 구독 목록 반환
    getSubscriptions() {
        return Array.from(this.subscriptions);
    }
}

export { SubscriptionManager };

