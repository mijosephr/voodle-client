<template>
  <v-navigation-drawer
    app
    class="teal"
    dark
    :value="sidebar"
    @input="closeSidebar"
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        link
        :to="item.href"
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block x-large outlined to="/">Log out</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    sidebar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [{ icon: "view-dashboard", text: "Dashboard", href: "/polls" }]
    };
  },
  methods: {
    closeSidebar(value) {
      if (!value) {
        this.$emit("close-sidebar");
      }
    }
  }
};
</script>
