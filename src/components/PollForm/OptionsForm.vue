<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon @click="changeSelectedForm('PollForm')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Options</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-text-field
          v-for="(option, index) in draftPoll.options"
          :key="index"
          :value="option.text"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    poll: {
      type: Object,
      default: () => ({ title: "" })
    },
    draftPoll: {
      type: Object,
      default: () => ({ options: [] })
    }
  },
  methods: {
    changeSelectedForm(formName) {
      this.$emit("change-selected-form", formName);
    }
  }
};
</script>
