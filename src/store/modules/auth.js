import apiClient from "@/api/axios";

export default {
  state: {
    user: null,
  },
  getters: {
    isAuth(state) {
      return Boolean(state.user);
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    async getUser({ commit }) {
      const user = await apiClient.get("user");
      commit("SET_USER", user.data);
    },
    async login({ dispatch }, credentials) {
      let token = await apiClient.post("login", credentials);
      token = token.data;
      localStorage.setItem("token", token);
      dispatch("getUser");
    },
    async logout({ commit }) {
      await apiClient.post("logout");
      localStorage.removeItem("token");
      commit("SET_USER", null);
      delete apiClient.defaults.headers.common["Authorization"];
    },
  },
};
