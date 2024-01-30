<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table-server
            :headers="headers"
            :items="residents"
            :itemsLength="itemsLength"
            :pageCount="lastPage"
            :loading="loading"
            @update:options="loadItems"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Residents List</v-toolbar-title>

                <v-divider class="mx-4" inset vertical></v-divider>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" dark class="mb-2" v-bind="props">
                      New Item
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.fio"
                              label="Resident Name"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.area"
                              label="Area"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-date-picker
                              v-model="editedItem.start_date"
                            ></v-date-picker>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                      >
                        Cancel
                      </v-btn>

                      <v-btn color="blue-darken-1" variant="text" @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closeDelete"
                        >Cancel</v-btn
                      >

                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:item.start_date="{ item }">
              {{ formatDate(item.start_date) }}
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon size="small" class="me-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>

              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table-server>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useDateFormat } from "@/composables/useDateFormat";
import { mapActions, mapState } from "vuex";

export default {
  name: "ResidentsView",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: "ID", key: "id" },
      { title: "Name", key: "fio" },
      { title: "Area", key: "area" },
      { title: "Date", key: "start_date" },
      { title: "Actions", key: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
      fio: "",
      area: 0,
      start_date: new Date(),
    },
    defaultItem: {
      fio: "",
      area: 0,
      start_date: new Date(),
    },
  }),
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      residents: (state) => state.resident.items,
      lastPage: (state) => state.resident.lastPage,
      itemsLength: (state) => state.resident.itemsLength,
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions([
      "createResident",
      "getResidents",
      "updateResident",
      "deleteResident",
    ]),
    // READ
    async loadItems({ page, itemsPerPage, sortBy }) {
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
        this.$store.commit("LOADING", true);

        await this.getResidents(params);

        this.$store.commit("LOADING", false);
      } catch (e) {
        this.$store.commit("LOADING", false);
        console.error(e);
      }
    },
    // CREATE/UPDATE
    editItem(item) {
      this.editedIndex = this.residents.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.start_date = new Date(this.editedItem.start_date);
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateResident(Object.assign({}, this.editedItem));
      } else {
        this.createResident(Object.assign({}, this.editedItem));
      }
      this.close();
    },
    // DELETE
    deleteItem(item) {
      this.editedIndex = this.residents.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteResident(this.editedItem);
      this.closeDelete();
    },
    // Close dialog
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  async created() {},
  setup() {
    const { formatDate } = useDateFormat();

    return { formatDate };
  },
};
</script>
