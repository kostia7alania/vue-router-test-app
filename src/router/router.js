import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import MiddlewarePlugin from "vue-router-middleware-plugin";
import authMiddleware from "./middleware/authMiddleware";

import VueScrollTo from "vue-scrollto";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      VueScrollTo.scrollTo("#app", 500, { offset: savedPosition.y });
      return savedPosition;
    } else {
      VueScrollTo.scrollTo("#app");
    }
  },
});

Vue.use(MiddlewarePlugin, {
  router,
  middleware: [authMiddleware],
});

router.beforeEach(async (to, from, next) => {
  const { title } = to.meta;
  const brand = "NGRSoftlab";
  document.title = `${title ? title + " | " : ""}${brand}`;
  next();
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
