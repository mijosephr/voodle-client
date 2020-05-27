import VuexORM from "@vuex-orm/core";
import { Poll, Option } from "@/store/models";

const database = new VuexORM.Database();

database.register(Poll);
database.register(Option);

export default database;
