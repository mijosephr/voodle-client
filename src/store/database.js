import VuexORM from "@vuex-orm/core";
import { Poll, DraftPoll, Option, DraftOption } from "@/store/models";

const database = new VuexORM.Database();

database.register(Poll);
database.register(DraftPoll);
database.register(Option);
database.register(DraftOption);

export default database;
