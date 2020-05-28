<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon to="/polls">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Poll</v-toolbar-title>
      <v-spacer />
      <v-btn text>Create</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <div>
          <h1>New Poll</h1>
          <PollForm />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PollForm from "@/components/PollForm/PollForm";

export default {
  components: { PollForm }
};
</script>
