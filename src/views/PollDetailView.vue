<template>
  <div>
    <h1>PollEditView</h1>
    <h2 v-text="poll.title" />
    <pre>{{ poll }}</pre>
  </div>
</template>

<script>
export default {
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
