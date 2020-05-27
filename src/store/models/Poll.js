import { Model } from "@vuex-orm/core";

export default class Poll extends Model {
  static entity = "polls";

  static fields() {
    return {
      id: this.attr(null),
      uid: this.attr(""),
      title: this.attr("")
    };
  }
}
