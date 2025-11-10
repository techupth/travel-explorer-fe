<template>
  <div class="pt-20 px-4">
    <h2 class="text-3xl font-bold mb-6 text-center">
      Pack your bags, adventure awaits!
    </h2>
    <SearchBar @updateResults="updateTrips" />
    <div
      v-if="tripsToShow.length === 0"
      class="text-center text-gray-500 mt-12"
    >
      No trips have been added yet. Be the first to share your favorite spot!
    </div>
    <Trips v-else :trips="tripsToShow" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Trips from "../components/Trips.vue";
import { api } from "../api.ts";
import type { Trip } from "../types/trip";

const allTrips = ref<Trip[]>([]);
const tripsToShow = ref<Trip[]>([]);

const fetchTrips = async () => {
  try {
    const response = await api.get<Trip[]>("/trips");
    allTrips.value = response.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    tripsToShow.value = allTrips.value;
  } catch (error) {
    console.error(error);
  }
};

const updateTrips = (results: Trip[]) => {
  tripsToShow.value = results;
};

onMounted(() => {
  fetchTrips();
});
</script>
