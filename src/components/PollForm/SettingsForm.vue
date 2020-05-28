<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon @click="changeSelectedForm('PollForm')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-list three-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-sticker-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Yes, no, if need be</v-list-item-title>
            <v-list-item-subtitle>
              Participants can mark an option as less than ideal.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch color="teal" v-model="form.settings.threeStateVote" />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-eye-off</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Hidden poll</v-list-item-title>
            <v-list-item-subtitle>
              Participants names and votes are kept hidden. Only you can see the
              results.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch color="teal" v-model="form.settings.hiddenPoll" />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-numeric-1-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>One vote per participant</v-list-item-title>
            <v-list-item-subtitle
              >Participants can only select one option.</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-switch
              color="teal"
              v-model="form.settings.oneVotePerParticipant"
            />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Limit votes per option</v-list-item-title>
            <v-list-item-subtitle>
              First comes, first served. A given option can only be selected by
              n participants.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch color="teal" v-model="hasMaxVotesPerOption" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({
        settings: {
          threeStateVote: false,
          hiddenPoll: false,
          oneVotePerParticipant: false,
          maxVotesPerOption: 0
        }
      })
    }
  },
  computed: {
    hasMaxVotesPerOption: {
      get: function() {
        return this.form.settings.maxVotesPerOption > 0;
      },
      set: function(newValue) {
        console.log("setter...", newValue);
      }
    }
  },
  methods: {
    changeSelectedForm(formName) {
      this.$emit("change-selected-form", formName);
    }
  }
};
</script>
