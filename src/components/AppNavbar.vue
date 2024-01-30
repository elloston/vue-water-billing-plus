<template>
  <v-app-bar>
    <v-container class="d-none d-md-block">
      <v-row class="justify-space-between align-center">
        <v-col cols="auto">
          <v-btn
            v-for="(link, index) in links"
            :key="index"
            text
            :to="link.path"
            >{{ link.title }}</v-btn
          >
        </v-col>

        <v-col cols="auto">
          <v-menu v-if="user" min-width="200px" rounded>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar color="primary" size="large">
                  <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar color="primary">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  <h3>{{ user.name }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text"> Account </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text" @click="logout()">
                    Log out
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>

          <v-btn v-else text to="/login">Log in</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- <div class="d-md-none">
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-navigation-drawer app temporary v-model="drawerOpen">
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          text
          :to="link.path"
          >{{ link.title }}</v-btn
        >
      </v-navigation-drawer>
    </div> -->
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppNavbar",
  data: () => ({
    links: [
      { path: "/", title: "Main page" },
      { path: "/residents", title: "Residents list" },
    ],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
