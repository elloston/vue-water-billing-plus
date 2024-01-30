<template>
  <v-card class="pa-5 mb-5">
    <h2>Bills List</h2>

    <v-btn v-if="user" @click="createBills()" type="button" block class="mt-2"
      >Create bills</v-btn
    >

    <v-data-table-server
      @update:options="loadItems"
      :loading="loading"
      :headers="headers"
      :items="bills"
      :itemsLength="itemsLength"
      :pageCount="lastPage"
    >
      <template v-slot:item.amount_rub="{ item }">
        <span>{{ formatCurrency(item.amount_rub) }}</span>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BillsCard",
  data: () => ({
    headers: [
      { title: "ID", key: "id" },
      { title: "Resident Name", key: "resident_name" },
      { title: "Bill Amount ", key: "amount_rub" },
    ],
    loading: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      periodDate: (state) => state.periodDate,
      bills: (state) => state.bill.items,
      lastPage: (state) => state.bill.lastPage,
      itemsLength: (state) => state.bill.itemsLength,
    }),
  },
  watch: {
    periodDate: {
      handler() {
        this.loadItems();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["getBills", "createBills"]),
    formatCurrency(value) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2,
      }).format(value);
    },
    async loadItems(options) {
      const { page = 1, itemsPerPage = 10, sortBy = [] } = options || {};

      let params = {
        page: page,
        sortBy: null,
        order: null,
        perPage: itemsPerPage,
      };

      if (sortBy.length) {
        params.sortBy = sortBy[0].key;
        params.order = sortBy[0].order;
      }

      try {
        this.loading = true;

        await this.getBills(params);

        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
  async mounted() {},
};
</script>

<style></style>
