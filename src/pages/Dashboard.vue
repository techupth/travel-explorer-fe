<template>
  <div class="p-8">
    <!-- Header -->

    <TripsTableHeader
      :trips="trips"
      @add-trip="showModal = true"
      @edit-trip="openEdit"
      @delete-trip="confirmDelete"
      :format-date="formatDate"
    />

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center text-gray-500 mt-12">
      Loading trips...
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-red-600 text-center mt-12">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div
      v-if="!isLoading && trips.length === 0 && !error"
      class="text-gray-500 text-center mt-12"
    >
      You haven’t added any trips yet.
    </div>

    <!-- Trips Table (Desktop) -->
    <TripsTable
      v-if="trips.length > 0"
      :trips="trips"
      :formatDate="formatDate"
      @edit-trip="openEdit"
      @delete-trip="confirmDelete"
    />

    <AddTripModal
      :show="showModal"
      @close="showModal = false"
      @added="fetchMyTrips"
    />
    <DeleteTripModal
      :show="showDeleteModal"
      :loading="loadingDelete"
      @close="closeDeleteModal"
      @confirm="() => deleteTrip(fetchMyTrips)"
    />
    <EditTripModal
      :show="showEditModal"
      :trip="currentTrip"
      @close="closeEditModal"
      @updated="fetchMyTrips"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { api } from "../api.ts";
import AddTripModal from "../components/AddTripModal.vue";
import DeleteTripModal from "../components/DeleteTripModal.vue";
import { useDeleteTrip } from "../composables/useDeleteTrip.ts";
import EditTripModal from "../components/EditTripModal.vue";
import { useEditTrip } from "../composables/useEditTrip.ts";
import TripsTable from "../components/TripsTable.vue";
import TripsTableHeader from "../components/TripsTableHeader.vue";

const showModal = ref(false);
const trips = ref<any[]>([]);
const isLoading = ref(false);
const error = ref("");

const token = localStorage.getItem("token");

console.log(showModal);
const fetchMyTrips = async () => {
  if (!token) {
    error.value = "You must be logged in to view your trips.";
    return;
  }

  isLoading.value = true;
  error.value = "";

  try {
    const response = await api.get("/trips/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    trips.value = response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      error.value = "Unauthorized. Please log in again.";
    } else if (err.response?.status === 404) {
      error.value = "No trips found.";
    } else {
      error.value = "Failed to load trips.";
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMyTrips();
});

const formatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};

const {
  showDeleteModal,
  confirmDelete,
  deleteTrip,
  closeDeleteModal,
  loadingDelete,
} = useDeleteTrip();
const { showEditModal, setTrip, currentTrip, closeEditModal } = useEditTrip();

const openEdit = (trip: any) => {
  setTrip(trip);
  showEditModal.value = true;
};
</script>
