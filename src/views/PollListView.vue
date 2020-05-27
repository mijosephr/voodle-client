<template>
  <div>
    <h1>PollListView</h1>
    <ul>
      <li v-for="poll in polls" :key="poll.id">
        <router-link :to="`/polls/${poll.uid}`" v-text="poll.title" />
      </li>
    </ul>
    <pre>{{ polls }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polls: [
        { id: 1, uid: "v6a8p1", title: "Poll #1" },
        { id: 2, uid: "h2k4n3", title: "Poll #2" },
        { id: 3, uid: "b3t6q7", title: "Poll #3" }
      ]
    };
  }
};
</script>
