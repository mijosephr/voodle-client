<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon to="/polls" exact>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...menu }">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <span>Im A ToolTip</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item :to="`/polls/${$route.params.uid}/edit`">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <div v-if="poll">
          <h1 v-text="poll.title" data-testid="title" />
          <ul>
            <li
              v-for="option in poll.options"
              :key="option.id"
              v-text="option.text"
              data-testid="option"
            />
          </ul>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Poll } from "@/store/models";

export default {
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
