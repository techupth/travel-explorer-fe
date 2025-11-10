<template>
  <div class="pt-20 px-4 max-w-4xl mx-auto">
    <div v-if="trip" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Cover Image -->
      <div class="w-full h-96 overflow-hidden">
        <img
          :src="trip.photos[0]"
          :alt="trip.title"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="p-6 flex flex-col">
        <h1 class="text-3xl font-bold mb-2">{{ trip.title }}</h1>

        <!-- Description ชิดซ้าย -->
        <p class="text-gray-700 mb-4 leading-relaxed text-left">
          {{ trip.description }}
        </p>

        <!-- Additional Photos Gallery -->
        <div
          v-if="trip.photos.length > 1"
          class="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-5"
        >
          <img
            v-for="(photo, index) in trip.photos.slice(1)"
            :key="index"
            :src="photo"
            :alt="`Photo ${index + 2}`"
            class="w-full h-32 object-cover rounded-lg"
          />
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in trip.tags"
            :key="tag"
            class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Map Section -->
        <!-- Map Section -->
        <div class="mt-6 border border-gray-200 rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-2 text-left">แผนที่</h2>

          <div v-if="trip.latitude && trip.longitude">
            <iframe
              :src="googleMapUrl"
              width="100%"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded shadow"
            ></iframe>

            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${trip.latitude},${trip.longitude}`"
              target="_blank"
              class="mt-2 inline-block text-blue-600 hover:text-blue-700"
            >
              View on Google Maps
            </a>
          </div>

          <p v-else class="text-gray-500">
            Map information not available for this destination.
          </p>
        </div>

        <p class="text-gray-400 text-sm mb-6">
          Created by {{ trip.authorDisplayName }} on
          {{ new Date(trip.createdAt).toLocaleDateString() }}
        </p>
      </div>
    </div>

    <!-- Loading / Empty state -->
    <div v-else class="text-center text-gray-500 mt-12">
      Loading trip details...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "../api.ts";
import type { Trip } from "../types/trip";

const route = useRoute();
const trip = ref<Trip | null>(null);

const fetchTripById = async (id: string | string[]) => {
  try {
    const response = await api.get<Trip>(`/trips/${id}`);
    trip.value = response.data;
  } catch (error) {
    console.error("Failed to fetch trip detail:", error);
  }
};

onMounted(() => {
  const id = route.params.id;
  if (id !== undefined) {
    fetchTripById(id);
  } else {
    console.error("Trip id is missing in route params.");
  }
});

// คำนวณ URL สำหรับ Google Map iframe
const googleMapUrl = computed(() => {
  if (!trip.value) return "";
  const { latitude, longitude } = trip.value;
  return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=th&z=14&output=embed`;
});
</script>

<style scoped></style>
