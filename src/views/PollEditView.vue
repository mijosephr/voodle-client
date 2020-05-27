<template>
  <div>
    <h1>PollDetailView</h1>
    <h2 v-text="poll.title" />
    <PollForm :poll="poll" />
    <pre>{{ poll }}</pre>
    <router-link to="/polls">Back to Poll List</router-link>
  </div>
</template>

<script>
import { Poll } from "@/store/models";
import PollForm from "@/components/PollForm";

export default {
  components: { PollForm },
  computed: {
    poll() {
      return Poll.query()
        .where("uid", this.$route.params.uid)
        .first();
    }
  }
};
</script>
