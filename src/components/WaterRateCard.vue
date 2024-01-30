<template>
  <v-card class="pa-5 mb-5">
    <h2 class="mb-2">Water Rate</h2>

    <v-form @submit.prevent="saveWaterRate()">
      <v-text-field
        v-model="waterRate.price"
        :rules="rules"
        label="Water Rate"
        hide-details
        :disabled="!Boolean(user)"
      ></v-text-field>

      <v-btn v-if="user" type="submit" block class="mt-2">Save</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import apiClient from "@/api/axios";
import { mapState } from "vuex";

export default {
  name: "WaterRateCard",
  data: () => ({
    waterRate: {
      price: 0,
      date: new Date(),
    },

    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a water rate.";
      },
    ],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      periodDate: (state) => state.periodDate,
      loading: (state) => state.loading,
    }),
  },
  watch: {
    periodDate: {
      handler() {
        this.getWaterRate();
      },
      immediate: true,
    },
  },
  methods: {
    async saveWaterRate() {
      try {
        this.$store.commit("LOADING", true);

        this.waterRate.date = this.periodDate;

        await apiClient.post("water-rates", this.waterRate);

        this.$store.commit("LOADING", false);
      } catch (e) {
        this.$store.commit("LOADING", false);
      }
    },
    async getWaterRate() {
      try {
        this.$store.commit("LOADING", true);

        let waterRate = await apiClient.get("water-rates", {
          params: {
            date: this.periodDate,
          },
        });

        this.waterRate = waterRate.data;

        this.$store.commit("LOADING", false);
      } catch (e) {
        this.$store.commit("LOADING", false);

        this.waterRate = {
          price: 0,
          date: new Date(),
        };
      }
    },
  },
  async mounted() {},
};
</script>
