import VuexORM from "@vuex-orm/core";
import { Poll } from "@/store/models";

const database = new VuexORM.Database();

database.register(Poll);

export default database;
