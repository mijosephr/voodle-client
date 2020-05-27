<template>
  <div v-if="poll">
    <h1>PollDetailView</h1>
    <h2 v-text="poll.title" />
    <ul>
      <li
        v-for="option in poll.options"
        :key="option.id"
        v-text="option.text"
      />
    </ul>
    <pre>{{ poll }}</pre>
    <router-link to="/polls">Back to Poll List</router-link>
  </div>
</template>

<script>
import { Poll } from "@/store/models";

export default {
  computed: {
    poll() {
      return Poll.query()
        .where("uid", this.$route.params.uid)
        .with("options")
        .first();
    }
  },
  mounted() {
    Poll.api().get(`/api/polls/${this.$route.params.uid}`, {
      dataKey: false,
      persistBy: "create",
      persistOptions: { create: ["options"] }
    });
  }
};
</script>
