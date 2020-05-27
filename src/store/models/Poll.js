import { Model } from "@vuex-orm/core";
import { Option } from "@/store/models";

export default class Poll extends Model {
  static entity = "polls";

  static fields() {
    return {
      id: this.attr(null),
      uid: this.attr(""),
      title: this.attr(""),
      // relationships
      options: this.hasMany(Option, "poll_id")
    };
  }
}
