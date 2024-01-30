import apiClient from "@/api/axios";

export default {
  state: {
    items: [],
    lastPage: 1,
    itemsLength: 1,
  },
  getters: {},
  mutations: {
    SET_RESIDENTS: (state, payload) => {
      state.items = payload.data;
      state.lastPage = payload.last_page;
      state.itemsLength = payload.total;
    },
  },
  actions: {
    // CREATE
    async createResident({ dispatch }, residentData) {
      residentData.start_date = residentData.start_date.toISOString();
      await apiClient.post("residents", residentData);
      dispatch("getResidents");
    },
    // READ
    async getResidents({ commit }, params) {
      const res = await apiClient.get(`residents`, { params });
      commit("SET_RESIDENTS", res.data);
    },
    // UPDATE
    async updateResident({ dispatch }, residentData) {
      residentData.start_date = residentData.start_date.toISOString();
      await apiClient.put(`residents/${residentData.id}`, residentData);
      dispatch("getResidents");
    },
    // DELETE
    async deleteResident({ dispatch }, residentData) {
      await apiClient.delete(`residents/${residentData.id}`);
      dispatch("getResidents");
    },
  },
};
