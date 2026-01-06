export class Store {
  constructor(initialState) {
    const savedData = JSON.parse(localStorage.getItem("app_state")) || {};

    this.state = {
      ...initialState,
      subscribedPressIds:
        savedData.subscribedPressIds ?? initialState.subscribedPressIds,
    };
    this.listeners = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    // 저장할 데이터만 골라내기
    const dataToSave = {
      subscribedPressIds: this.state.subscribedPressIds,
    };

    localStorage.setItem("app_state", JSON.stringify(dataToSave));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.state);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
