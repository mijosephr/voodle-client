<template>
  <v-app>
    <Topbar @open-sidebar="sidebar = true" />
    <Sidebar :sidebar="sidebar" @close-sidebar="sidebar = false" />
    <v-content>
      <v-container>
        <v-list v-for="poll in polls" :key="poll.id">
          <v-list-item :to="`/polls/${poll.uid}`">
            <v-list-item-content>
              <v-list-item-title>
                <span v-text="poll.title" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-content>
    <FloatingMenu />
  </v-app>
</template>

<script>
import { Poll } from "@/store/models";
import Topbar from "@/components/PollList/Topbar";
import Sidebar from "@/components/PollList/Sidebar";
import FloatingMenu from "@/components/PollList/FloatingMenu";

export default {
  components: { Topbar, Sidebar, FloatingMenu },
  data() {
    return {
      sidebar: false
    };
  },
  computed: {
    polls() {
      return Poll.all();
    }
  },
  mounted() {
    Poll.api().get("/api/polls", {
      dataKey: false,
      persistBy: "create",
      persistOptions: { create: ["options"] }
    });
  }
};
</script>
