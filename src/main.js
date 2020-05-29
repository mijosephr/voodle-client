import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { makeServer } from "./server";

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  makeServer();
}

import { Server, Response } from "miragejs";

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach(method => {
        this[method]("/*", async (schema, request) => {
          let [status, headers, body] = await window.handleFromCypress(request);
          return new Response(status, headers, body);
        });
      });
    }
  });
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
