import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";

import database from "@/store/database";
// import { Poll } from "@/store/models";

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, { axios });

export default new Vuex.Store({
  plugins: [VuexORM.install(database)]
});

// Poll.insert({
//   data: [
//     { title: "Poll #1", uid: "r3u4m8" },
//     { title: "Poll #2", uid: "s6v0q1" },
//     { title: "Poll #3", uid: "f6d3b7" },
//   ],
// });
