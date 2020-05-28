<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon exact :to="`/polls/${$route.params.uid}`">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Poll</v-toolbar-title>
      <v-spacer />
      <v-btn text>Save</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <div>
          <v-text-field label="Title" :value="form.title" />
          <v-text-field @focus="changeSelectedForm('OptionsForm')" />
          <v-text-field @focus="changeSelectedForm('SettingsForm')" />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({ title: "" })
    }
  },
  methods: {
    changeSelectedForm(formName) {
      this.$emit("change-selected-form", formName);
    }
  }
};
</script>
