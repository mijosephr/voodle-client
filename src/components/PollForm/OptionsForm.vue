<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Options</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="save">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-text-field
          v-for="(option, index) in draftPoll.options"
          :key="index"
          :value="option.text"
          @input="updateOption($event, option.id)"
        />
        <v-btn block x-large outlined class="mt-6" @click="addOption"
          >Add an option</v-btn
        >
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { DraftOption } from "@/store/models";

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
    },
    async addOption() {
      await this.draftPoll.addOption();
    },
    async updateOption(value, optionId) {
      await DraftOption.update({
        where: optionId,
        data: {
          text: value
        }
      });
    },
    cancel() {
      this.draftPoll.recreateOptions();
      this.changeSelectedForm("PollForm");
    },
    save() {
      this.changeSelectedForm("PollForm");
    }
  }
};
</script>
