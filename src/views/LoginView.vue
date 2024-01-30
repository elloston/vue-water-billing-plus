<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-5" elevation="2">
          <v-form
            @submit.prevent="submit()"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="form.email"
              :rules="form.emailRules"
              label="Email"
              required
              solo
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="form.passwordRules"
              label="Password"
              type="password"
              required
              solo
            ></v-text-field>

            <v-btn
              type="submit"
              class="mt-3"
              block
              :disabled="!valid || loading"
              color="primary"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="white"
                size="20"
                class="mr-2"
              ></v-progress-circular>
              Войти
            </v-btn>

            <v-alert v-if="error" type="error" class="mt-3">
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    valid: true,
    error: false,
    errorMessage: "",
    form: {
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
      ],
    },
  }),
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.error = false;
        try {
          this.$store.commit("LOADING", true);

          await this.$store.dispatch("login", this.form);
          await this.$store.dispatch("getUser");

          this.$router.push("/");
        } catch (e) {
          this.error = true;
          this.errorMessage = e.response?.data?.message || "Ошибка авторизации";
        } finally {
          this.$store.commit("LOADING", false);
        }
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
