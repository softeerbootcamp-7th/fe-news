export const subscribePressStore = {
  state: {
      subscribedPressIdList: [],
  },
  listeners: [],

  reducer(state, action) {
    switch (action.type) {
      case 'SUBSCRIBE':
        if (state.subscribedPressIdList.includes(action.payload)) return state;
        return {
          ...state,
          subscribedPressIdList: [...state.subscribedPressIdList, action.payload],
        };
      case 'UNSUBSCRIBE':
        return {
          ...state,
          subscribedPressIdList: state.subscribedPressIdList.filter(id => id !== action.payload),
        };
      default:
        return state;
    }
  },

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.notify();
  },

  // subscribe: 상태가 변하면 실행할 함수 등록
  subscribe(callback) {
    this.listeners.push(callback);
  },

  // notify: 등록된 모든 함수 실행
  notify() {
    this.listeners.forEach(callback => callback());
  },
  
  getState() {
    return this.state;
  }
};