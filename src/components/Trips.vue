<template>
  <section class="py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <TripCard v-for="trip in displayedTrips" :key="trip.id" :trip="trip" />
    </div>

    <div v-if="showLoadMore" class="text-center mt-6">
      <button
        @click="loadMore"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Load More
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import TripCard from "./TripCard.vue";
import { api } from "../api.ts";
import type { Trip } from "../types/trip";

const trips = ref<Trip[]>([]);
const itemsPerPage = 6; // จำนวนการ์ดต่อ load
const currentPage = ref(1);

// คำนวณ trips ที่จะแสดง
const displayedTrips = computed(() => {
  return trips.value.slice(0, currentPage.value * itemsPerPage);
});

// ปุ่ม Load More แสดงถ้ายังมี trips เหลือ
const showLoadMore = computed(() => {
  return displayedTrips.value.length < trips.value.length;
});

// ฟังก์ชันโหลด batch ต่อไป
const loadMore = () => {
  currentPage.value++;
};

const fetchTrips = async () => {
  try {
    const response = await api.get<Trip[]>("/trips");
    trips.value = response.data.sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch trips:", error);
  }
};

onMounted(() => {
  fetchTrips();
});
</script>
