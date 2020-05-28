<template>
  <v-app-bar app dark color="teal">
    <v-app-bar-nav-icon @click="openSidebar" />
    <v-toolbar-title class="headline font-weight-black">Voodle</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    openSidebar() {
      this.$emit("open-sidebar");
    }
  }
};
</script>
