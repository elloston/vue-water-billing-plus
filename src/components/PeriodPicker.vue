<template>
  <v-card class="pa-5">
    <v-row>
      <v-col cols="12" md="2">
        <v-select
          hide-details
          variant="outlined"
          v-model="selectedYear"
          :items="years"
          label="Year"
          :on-update:model-value="updatePeriod()"
        ></v-select>
      </v-col>

      <v-col cols="12" md="2">
        <v-select
          hide-details
          variant="outlined"
          v-model="selectedMonth"
          item-value="value"
          item-title="text"
          label="Month"
          :items="months"
          :on-update:model-value="updatePeriod()"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "PeriodPicker",
  data: () => ({
    selectedYear: new Date().getFullYear(),
    years: [],

    selectedMonth: new Date().getMonth(),
    months: [],
  }),
  methods: {
    updatePeriod() {
      let lastDayOfMonth = new Date(
        +this.selectedYear,
        +this.selectedMonth + 1,
        0
      );

      const date = new Date(
        +this.selectedYear,
        +this.selectedMonth,
        lastDayOfMonth.getDate()
      );

      this.$store.commit("UPDATE_PERIOD_DATE", date);
    },
    pushYears() {
      const currentYear = new Date().getFullYear();

      const startYear = 2000;
      const endYear = currentYear + 1;

      for (let year = startYear; year <= endYear; year++) {
        this.years.push(year.toString());
      }
    },
    pushMonths() {
      const currentDate = new Date();
      currentDate.setDate(1);
      const months = [];
      for (let month = 0; month < 12; month++) {
        currentDate.setMonth(month);
        const monthName = moment(currentDate).format("MMMM");
        months.push({ value: month, text: monthName });
      }
      this.months = months;
    },
  },
  async mounted() {
    this.pushYears();
    this.pushMonths();
  },
};
</script>
