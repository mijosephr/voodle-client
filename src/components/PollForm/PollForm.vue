<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon exact @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Poll</v-toolbar-title>
      <v-spacer />
      <v-btn text @click="save">Save</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <div>
          <v-text-field
            label="Title"
            :value="draftPoll.title"
            @input="updateTitle"
          />
          <v-text-field @focus="changeSelectedForm('OptionsForm')" />
          <v-text-field @focus="changeSelectedForm('SettingsForm')" />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Poll, DraftPoll } from "@/store/models";

export default {
  props: {
    poll: {
      type: Object,
      default: () => ({ title: "" })
    },
    draftPoll: {
      type: Object,
      default: () => ({ title: "" })
    }
  },
  computed: {
    uid() {
      return this.$route.params.uid;
    }
  },
  methods: {
    changeSelectedForm(formName) {
      this.$emit("change-selected-form", formName);
    },
    async updateTitle(value) {
      await DraftPoll.update({
        where: this.draftPoll.id,
        data: {
          title: value
        }
      });
    },
    cancel() {
      this.$router.push(`/polls/${this.uid}`);
    },
    async save() {
      const { title } = this.draftPoll;
      await Poll.change(this.uid, { title });
      this.$router.push(`/polls/${this.uid}`);
    }
  }
};
</script>
