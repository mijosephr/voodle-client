import { Model } from "@vuex-orm/core";
import { Poll } from "@/store/models";

export default class Option extends Model {
  static entity = "options";

  static fields() {
    return {
      id: this.attr(null),
      poll_id: this.attr(null),
      text: this.attr(""),
      // relationships
      poll: this.belongsTo(Poll, "poll_id")
    };
  }
}
