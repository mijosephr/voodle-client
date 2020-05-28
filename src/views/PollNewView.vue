<template>
  <BaseForm v-if="draftPoll" :poll="poll" :draftPoll="draftPoll" />
</template>

<script>
import BaseForm from "@/components/PollForm/BaseForm";
import { Poll, DraftPoll } from "@/store/models";

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
  }
};
</script>
