<template>
  <v-app>
    <v-card height="100%" class="d-flex flex-column">
      <v-card-text class="text-center my-12">
        <div class="display-2 font-weight-black mb-6">Voodle</div>
        <div class="title font-weight-regular">
          The easiest way to schedule your meetings
        </div>
      </v-card-text>
      <v-spacer />
      <v-card-actions>
        <v-btn block x-large dark color="teal" to="/signup">Sign up</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block x-large outlined color="teal" to="/login">Log in</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
