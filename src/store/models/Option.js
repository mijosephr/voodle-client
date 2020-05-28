import { Model } from "@vuex-orm/core";
import { Poll, DraftPoll } from "@/store/models";

export default class Option extends Model {
  static entity = "options";

  static types() {
    return {
      OPTION: Option,
      DRAFT_OPTION: DraftOption
    };
  }

  static fields() {
    return {
      id: this.attr(null),
      type: this.attr("OPTION"),
      poll_id: this.attr(null),
      text: this.attr(""),
      // relationships
      poll: this.belongsTo(Poll, "poll_id")
    };
  }
}

export class DraftOption extends Option {
  static entity = "draft_options";
  static baseEntity = "options";

  static fields() {
    return {
      ...super.fields(),
      poll: this.belongsTo(DraftPoll, "poll_id")
    };
  }
}
