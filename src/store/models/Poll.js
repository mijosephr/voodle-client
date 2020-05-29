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

  static async postNew({ title, options }) {
    const {
      entities: {
        polls: [poll]
      }
    } = await this.api().post(
      `/api/polls`,
      { title, options },
      {
        dataKey: false,
        persistBy: "create",
        persistOptions: {
          create: ["options"]
        }
      }
    );
    return poll;
  }

  static async change(uid, { title, options }) {
    await this.api().put(
      `/api/polls/${uid}`,
      { title, options },
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
    return draft_poll;
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

  async recreateOptions() {
    const poll = Poll.query()
      .where("uid", this.uid)
      .with("options")
      .first();
    const optionsData = poll.options.map(option => {
      const { text } = option;
      return { text, poll_id: this.id };
    });
    await DraftOption.delete(option => {
      return option.poll_id === this.id;
    });
    await DraftOption.insert({
      data: optionsData
    });
  }

  async addOption() {
    await DraftOption.insert({
      data: { text: "", poll_id: this.id }
    });
  }
}
