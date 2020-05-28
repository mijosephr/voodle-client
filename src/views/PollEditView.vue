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
        <div v-if="poll">
          <PollForm :poll="poll" />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Poll } from "@/store/models";
import PollForm from "@/components/PollForm";

export default {
  components: { PollForm },
  computed: {
    poll() {
      return Poll.query()
        .where("uid", this.$route.params.uid)
        .with("options")
        .first();
    }
  },
  mounted() {
    Poll.api().get(`/api/polls/${this.$route.params.uid}`, {
      dataKey: false,
      persistBy: "create",
      persistOptions: { create: ["options"] }
    });
  }
};
</script>
