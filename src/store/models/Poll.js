import { Model } from "@vuex-orm/core";
import { Option, DraftOption } from "@/store/models";

export default class Poll extends Model {
  static entity = "polls";

  static types() {
    return {
      POLL: Poll,
      DRAFT_POLL: DraftPoll
    };
  }

  static fields() {
    return {
      id: this.attr(null),
      type: this.attr("POLL"),
      uid: this.attr(""),
      title: this.attr(""),
      // relationships
      options: this.hasMany(Option, "poll_id")
    };
  }

  static find(uid) {
    return this.query()
      .where("uid", uid)
      .with("options")
      .first();
  }

  static async retrieve(uid) {
    await this.api().get(`/api/polls/${uid}`, {
      dataKey: false,
      persistBy: "create",
      persistOptions: {
        create: ["options"]
      }
    });
  }

  static async change(uid, { title }) {
    await this.api().put(
      `/api/polls/${uid}`,
      { title },
      {
        dataKey: false,
        persistBy: "create",
        persistOptions: {
          create: ["options"]
        }
      }
    );
  }

  async createDraft() {
    const { uid, title, options } = this;
    const {
      draft_polls: [draft_poll]
    } = await DraftPoll.insert({
      data: {
        uid,
        title
      }
    });
    options.forEach(async option => {
      const { text } = option;
      await DraftOption.insert({
        data: {
          poll_id: draft_poll.id,
          text
        }
      });
    });
  }
}

export class DraftPoll extends Poll {
  static entity = "draft_polls";
  static baseEntity = "polls";

  static fields() {
    return {
      ...super.fields(),
      options: this.hasMany(DraftOption, "poll_id")
    };
  }
}
