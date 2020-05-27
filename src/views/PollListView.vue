<template>
  <div>
    <h1>PollListView</h1>
    <ul>
      <li v-for="poll in polls" :key="poll.id">
        <router-link :to="`/polls/${poll.uid}`" v-text="poll.title" />
        (<router-link :to="`/polls/${poll.uid}/edit`">Edit</router-link>)
      </li>
    </ul>
    <pre>{{ polls }}</pre>
    <router-link to="/create">Create a poll</router-link>
  </div>
</template>

<script>
import { Poll } from "@/store/models";

export default {
  computed: {
    polls() {
      return Poll.all();
    }
  },
  mounted() {
    Poll.api().get("/api/polls", {
      dataKey: false,
      persistBy: "create",
      persistOptions: { create: ["options"] }
    });
  }
};
</script>
