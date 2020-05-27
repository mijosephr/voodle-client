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
        Poll.update({
          where: this.poll.id,
          data: { title }
        });
      } else {
        const uid = Math.random()
          .toString(36)
          .slice(2);
        Poll.insert({ data: { uid, title } });
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
