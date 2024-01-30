<template>
  <v-container>
    <v-row>
      <v-col>
        <period-picker />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <water-rate-card />

        <meter-record-card />
      </v-col>

      <v-col cols="12" md="8">
        <bills-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PeriodPicker from "@/components/PeriodPicker.vue";
import WaterRateCard from "@/components/WaterRateCard.vue";
import MeterRecordCard from "@/components/MeterRecordCard.vue";
import BillsCard from "@/components/BillsCard.vue";

export default {
  name: "HomeView",
  components: {
    PeriodPicker,
    WaterRateCard,
    MeterRecordCard,
    BillsCard,
  },
};
</script>
