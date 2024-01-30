<template>
  <div>
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
    </v-app-bar>

    <v-app-bar class="d-md-none" app dense flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="primary" permanent>
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :prepend-icon="link.icon"
          :title="link.title"
          :to="link.path"
          @click="drawer = !drawer"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="user" @click="logout()" block> Logout </v-btn>
          <v-btn v-else to="/login" @click="drawer = !drawer" block>
            Login
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppNavbar",
  data: () => ({
    drawer: false,
    links: [
      { path: "/", title: "Main Page", icon: "mdi-view-dashboard" },
      { path: "/residents", title: "Residents List", icon: "mdi-account-box" },
    ],
    drawerOpen: true,
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
