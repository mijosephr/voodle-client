<template>
  <div>
    <h1>PollNewView</h1>
    <h2>New Poll</h2>
    <PollForm />
    <router-link to="/polls">Back to Poll List</router-link>
  </div>
</template>

<script>
import PollForm from "@/components/PollForm";

export default {
  components: { PollForm }
};
</script>
