<template>
  <div>
    <h1>PollNewView</h1>
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
        title: ""
      }
    };
  }
};
</script>
