<template>
  <BaseForm v-if="draftPoll" :poll="poll" :draftPoll="draftPoll" />
</template>

<script>
import BaseForm from "@/components/PollForm/BaseForm";
import { Poll, DraftPoll, Option } from "@/store/models";

export default {
  components: { BaseForm },
  computed: {
    poll() {
      return Poll.query()
        .where("uid", "0")
        .first();
    },
    draftPoll() {
      return DraftPoll.query()
        .where("uid", "0")
        .first();
    }
  },
  async mounted() {
    await Poll.insert({ data: { uid: "0", title: "" } });
    await this.poll.createDraft();
    // Reactivity issue:
    // Draft option doesn't show up in UI
    // https://github.com/vuex-orm/vuex-orm/issues/415
    await Option.insert({
      data: { poll_id: this.poll.id, text: "pre-created" }
    });
    await this.draftPoll.recreateOptions();
  }
};
</script>
