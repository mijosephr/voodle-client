import Vue from "vue";
import VueRouter from "vue-router";

const HomeView = () =>
  import(/* webpackChunkName: "home-view" */ "../views/HomeView.vue");
const SignupView = () =>
  import(/* webpackChunkName: "signup-view" */ "../views/SignupView.vue");
const LoginView = () =>
  import(/* webpackChunkName: "login-view" */ "../views/LoginView.vue");
const PollListView = () =>
  import(/* webpackChunkName: "poll-list-view" */ "../views/PollListView.vue");
const PollDetailView = () =>
  import(
    /* webpackChunkName: "poll-detail-view" */ "../views/PollDetailView.vue"
  );
const PollNewView = () =>
  import(/* webpackChunkName: "poll-new-view" */ "../views/PollNewView.vue");
const PollEditView = () =>
  import(/* webpackChunkName: "poll-edit-view" */ "../views/PollEditView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home-view",
    component: HomeView
  },
  {
    path: "/signup",
    name: "signup-view",
    component: SignupView
  },
  {
    path: "/login",
    name: "login-view",
    component: LoginView
  },
  {
    path: "/polls",
    name: "poll-list-view",
    component: PollListView
  },
  {
    path: "/create",
    name: "poll-new-view",
    component: PollNewView
  },
  {
    path: "/polls/:uid",
    name: "poll-detail-view",
    component: PollDetailView
  },
  {
    path: "/polls/:uid/edit",
    name: "poll-edit-view",
    component: PollEditView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
