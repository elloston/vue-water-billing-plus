<template>
  <v-card class="pa-5 mb-5">
    <h2 class="mb-2">Meter Record</h2>

    <v-form @submit.prevent="savemeterRecord()">
      <v-text-field
        v-model="meterRecord.amount_volume"
        :rules="rules"
        label="Meter Record"
        hide-details
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Save</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import apiClient from "@/api/axios";
import { mapState } from "vuex";

export default {
  name: "MeterRecordCard",
  data: () => ({
    meterRecord: {
      amount_volume: 0,
      date: new Date(),
    },

    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a meter records.";
      },
    ],
  }),
  computed: {
    ...mapState({
      periodDate: (state) => state.periodDate,
      loading: (state) => state.loading,
    }),
  },
  watch: {
    periodDate: {
      handler() {
        this.getmeterRecord();
      },
      immediate: true,
    },
  },
  methods: {
    async savemeterRecord() {
      try {
        this.$store.commit("LOADING", true);

        this.meterRecord.date = this.periodDate;

        await apiClient.post("pump-meter-records", this.meterRecord);

        this.$store.commit("LOADING", false);
      } catch (e) {
        this.$store.commit("LOADING", false);
        console.error(e);
      }
    },
    async getmeterRecord() {
      try {
        this.$store.commit("LOADING", true);

        let meterRecord = await apiClient.get("pump-meter-records", {
          params: {
            date: this.periodDate,
          },
        });

        this.meterRecord = meterRecord.data;

        this.$store.commit("LOADING", false);
      } catch (e) {
        this.$store.commit("LOADING", false);
        this.meterRecord = {
          amount_volume: 0,
          date: new Date(),
        };
      }
    },
  },
  async mounted() {},
};
</script>

<style></style>
