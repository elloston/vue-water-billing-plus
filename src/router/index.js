import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/residents",
    name: "residents",
    component: () => import("../views/ResidentsView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuth;

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
