<template>
  <form>
    <input type="text" :value="poll.title" />
    <input type="submit" value="Save" />
  </form>
</template>

<script>
export default {
  props: {
    poll: {
      type: Object,
      required: true
    }
  }
};
</script>
