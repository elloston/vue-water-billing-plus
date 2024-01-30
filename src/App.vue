<template>
  <v-app class="bg-blue-grey-lighten-5">
    <app-navbar />

    <div class="pt-16">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
  },
  async created() {
    if (localStorage.getItem("token")) {
      await this.$store.dispatch("getUser");
    }
  },
};
</script>

<style lang="scss"></style>
