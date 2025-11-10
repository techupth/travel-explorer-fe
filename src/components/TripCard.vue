<template>
  <div
    class="max-w-md mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 w-full"
  >
    <div class="w-full h-40 overflow-hidden">
      <img
        :src="trip.photos[0]"
        :alt="trip.title"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- เนื้อหาการ์ด flex-grow ให้ปุ่มติดล่าง -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold mb-2">{{ trip.title }}</h3>
      <p
        class="text-gray-700 text-sm mb-4 text-left leading-relaxed min-h-[4.5rem]"
      >
        {{ truncateText(trip.description, 120) }}
      </p>

      <router-link
        :to="`/trips/${trip.id}`"
        class="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-center text-sm"
      >
        View Detail
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Trip } from "../types/trip";

const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});

function truncateText(text: string, length: number): string {
  if (!text) {
    return "";
  }
  return text.length > length ? text.slice(0, length) + "..." : text;
}
</script>
