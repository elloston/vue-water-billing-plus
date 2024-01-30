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
    async getBills({ commit, rootState }, params) {
      const res = await apiClient.get(`bills`, {
        params: {
          date: rootState.periodDate,
          page: params.page,
          sortBy: params.sortBy,
          order: params.order,
          perPage: params.perPage,
        },
      });

      commit("SET_BILLS", res.data);
    },
  },
};
