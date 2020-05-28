<template>
  <v-speed-dial v-model="menu" fixed bottom right>
    <template v-slot:activator>
      <v-btn v-model="menu" color="teal" dark fab>
        <v-icon v-if="menu">mdi-close</v-icon>
        <v-icon v-else>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-tooltip left v-for="(item, index) in items" :key="index">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          dark
          small
          color="teal"
          v-on="on"
          :to="item.href"
          @click="reusePoll(item)"
        >
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-btn>
      </template>
      <span v-text="item.text" />
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      items: [
        {
          icon: "reload",
          text: "Reuse poll"
        },
        {
          icon: "format-list-bulleted-type",
          text: "Make a choice",
          href: "/create"
        },
        {
          icon: "calendar",
          text: "Pick a date",
          href: "/create"
        }
      ]
    };
  },
  methods: {
    reusePoll(item) {
      if (!item.href) {
        console.log("reusePoll...");
      }
    }
  }
};
</script>
