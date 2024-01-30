import { createStore } from "vuex";
import auth from "./modules/auth.js";
import resident from "./modules/resident.js";
import bill from "./modules/bill.js";

export default createStore({
  state: {
    loading: false,
    periodDate: new Date(),
    period: new Date(),
  },
  getters: {},
  mutations: {
    LOADING(state, payload) {
      state.loading = payload;
    },
    UPDATE_PERIOD_DATE(state, payload) {
      state.periodDate = payload.toISOString();
    },
  },
  actions: {},
  modules: {
    auth,
    resident,
    bill,
  },
});
