<template>
  <BaseForm :form="form" />
</template>

<script>
import BaseForm from "@/components/PollForm/BaseForm";

export default {
  components: { BaseForm },
  data() {
    return {
      form: {
        title: "ABC",
        options: [
          { text: "Option #1" },
          { text: "Option #2" },
          { text: "Option #3" }
        ],
        settings: {
          threeStateVote: true,
          hiddenPoll: false,
          oneVotePerParticipant: true,
          maxVotesPerOption: 5
        }
      }
    };
  }
};
</script>
