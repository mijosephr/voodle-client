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
      default: () => ({ title: "", options: [] })
    },
    draftPoll: {
      type: Object,
      default: () => ({ title: "", options: [] })
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
      const res = await DraftPoll.update({
        where: this.draftPoll.id,
        data: {
          title: value
        }
      });
      console.log(res, value, this.draftPoll);
    },
    cancel() {
      if (this.uid) {
        this.$router.push(`/polls/${this.uid}`);
      } else {
        this.$router.push("/polls");
      }
    },
    async save() {
      const { title } = this.draftPoll;

      if (this.uid) {
        const pollOptions = this.poll.options.map(option => {
          const { id } = option;
          return { id };
        });
        const draftPollOptions = this.draftPoll.options.map(option => {
          const { text } = option;
          return { text };
        });
        const options = draftPollOptions.map((draftPollOption, index) => {
          const { text } = draftPollOption;
          if (pollOptions[index]) {
            const { id } = pollOptions[index];
            return { id, text };
          } else {
            return { text };
          }
        });
        console.log("options", options);
        await Poll.change(this.uid, { title, options });
        this.$router.push(`/polls/${this.uid}`);
      } else {
        const options = this.draftPoll.options.map(option => {
          const { text } = option;
          return { text };
        });
        console.log("options", options);
        const poll = await Poll.postNew({ title, options });
        this.$router.push(`/polls/${poll.uid}`);
      }
    }
  }
};
</script>
