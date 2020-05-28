<template>
  <BaseForm v-if="draftPoll" :poll="poll" :draftPoll="draftPoll" />
</template>

<script>
import BaseForm from "@/components/PollForm/BaseForm";
import { Poll, DraftPoll } from "@/store/models";

export default {
  components: { BaseForm },
  computed: {
    uid() {
      return this.$route.params.uid;
    },
    poll() {
      return Poll.find(this.uid);
    },
    draftPoll() {
      return DraftPoll.find(this.uid);
    }
  },
  async mounted() {
    await Poll.retrieve(this.uid);
    await this.poll.createDraft();
  }
};
</script>
