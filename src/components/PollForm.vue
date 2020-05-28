<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field label="Title" />
    <div v-for="(option, index) in form.options" :key="index">
      <v-text-field type="text" v-model="option.text" />
    </div>
    <a href="#" @click="add">Add option</a>
    <v-btn type="submit">Save</v-btn>
    <v-btn text @click="reset">Reset</v-btn>
  </v-form>
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
      const { title, options } = this.form;
      if (this.poll) {
        Poll.api().put(
          `/api/polls/${this.poll.uid}`,
          { title, options },
          { dataKey: false }
        );
      } else {
        Poll.api().post("/api/polls", { title, options }, { dataKey: false });
      }
    },
    add() {
      this.form.options = [...this.form.options, { text: "" }];
    },
    remove(index) {
      this.form.options.splice(index, 1);
    },
    reset() {
      let { id, title, options } = this.poll || {
        id: null,
        title: "",
        options: []
      };
      options = options.map(option => {
        const { id, text } = option;
        return { id, text };
      });
      this.form = { id, title, options };
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
