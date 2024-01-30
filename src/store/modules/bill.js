import apiClient from "@/api/axios";

export default {
  state: {
    items: [],
    lastPage: 1,
    itemsLength: 1,
  },
  getters: {},
  mutations: {
    SET_BILLS: (state, payload) => {
      state.items = payload.data;
      state.lastPage = payload.meta.last_page;
      state.itemsLength = payload.meta.total;
    },
  },
  actions: {
    // CREATE
    async createBills({ dispatch, rootState }) {
      await apiClient.post("bills", {
        date: rootState.periodDate,
      });
      dispatch("getBills");
    },
    // READ
    async getBills({ commit, rootState }, params = {}) {
      const { page = 1, sortBy = "id", order = "asc", perPage = 10 } = params;

      const res = await apiClient.get(`bills`, {
        params: {
          date: rootState.periodDate,
          page,
          sortBy,
          order,
          perPage,
        },
      });

      commit("SET_BILLS", res.data);
    },
  },
};
