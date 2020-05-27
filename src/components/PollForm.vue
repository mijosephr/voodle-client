<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="form.title" />
    <input type="submit" value="Save" />
    <a href="#" @click="reset">Reset</a>
  </form>
</template>

<script>
import { Poll } from "@/store/models";

export default {
  props: {
    poll: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    onSubmit() {
      const { title } = this.form;
      if (this.poll) {
        Poll.api().put(
          `/api/polls/${this.poll.uid}`,
          { title },
          { dataKey: false }
        );
      } else {
        Poll.api().post("/api/polls", { title }, { dataKey: false });
      }
    },
    reset() {
      const { id, title } = this.poll || { id: null, title: "" };
      this.form = { id, title };
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
