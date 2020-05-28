<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-form>
              <div
                class="font-weight-black text-center teal--text display-2 mb-6"
              >
                Voodle
              </div>
              <v-text-field label="Username" />
              <v-text-field label="Password" />
              <v-btn x-large block dark color="teal" class="mt-6" to="/polls"
                >Log in</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
