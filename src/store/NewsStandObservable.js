import Observable from "./Observable.js";

export class NewsStandObservable extends Observable {
  constructor({ pressMode, pageIdx, subscribedPressIds = [] }) {
    super();
    this.state = {
      pressMode,
      pageIdx,
      subscribedPressIds,
    };
  }

  // 내부적으로만 사용하는 상태 업데이트 및 전파 함수
  #updateState(newState) {
    const isChanged = Object.entries(newState).some(
      ([key, value]) => this.state[key] !== value
    );
    if (!isChanged) return;

    this.state = { ...this.state, ...newState };
    this.notify(this.state);
  }

  // 기존상태 선택 가능
  setPressMode(pressMode) {
    this.#updateState({ pressMode });
  }

  setPageIdx(pageIdx) {
    this.state.pageIdx = pageIdx;
    this.notify(this.state);
  }

  addPressId(id) {
    this.state.subscribedPressIds = [...this.state.subscribedPressIds, id];
    this.notify(this.state);
  }

  removePressId(id) {
    this.state.subscribedPressIds = this.state.subscribedPressIds.filter(
      (subId) => subId !== id
    );
    this.notify(this.state);
  }
}
