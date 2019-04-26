const initializeState = () => ({
  inProgress: false,
  status: '',
  key: '',
});

export default () => ({
  state: initializeState(),
  mutations: {
    setRequestState(state, payload) {
      state.key = payload.key || '';
      state.status = payload.status || '';
      state.inProgress = payload.inProgress || false;
    },
    clearRequestState(state) {
      Object.assign(state, initializeState());
    },
  },
  actions: {
    setRequestStatus(context, payload) {
      context.commit('setRequestState', payload);
    },
    clearRequestStatus(context) {
      context.commit('clearRequestState');
    },
  },
  getters: {
    request: state => state,
  },
});
