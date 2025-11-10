// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import TripDetail from "../pages/TripDetail.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/trips/:id", component: TripDetail },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem("user");
  if (to.meta.requiresAuth && !auth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
