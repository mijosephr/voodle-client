<template>
  <div>
    <h1>PollDetailView</h1>
    <h2 v-text="poll.title" />
    <PollForm :poll="poll" />
    <pre>{{ poll }}</pre>
  </div>
</template>

<script>
import PollForm from "@/components/PollForm";

export default {
  components: { PollForm },
  data() {
    return {
      poll: {
        id: 2,
        uid: "h2k4n3",
        title: "Poll #2"
      }
    };
  }
};
</script>
