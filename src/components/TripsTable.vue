<template>
  <div>
    <!-- Desktop Table -->
    <table class="min-w-full border-collapse hidden md:table">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 text-left">Image</th>
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Tags</th>
          <th class="p-2 text-left">Last Updated</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id" class="border-b text-start">
          <td class="p-2">
            <img :src="trip.photos[0]" class="w-20 h-20 object-cover rounded" />
          </td>
          <td class="p-2">
            <router-link
              :to="`/trips/${trip.id}`"
              class="text-blue-600 hover:underline"
            >
              {{ trip.title }}
            </router-link>
          </td>
          <td class="p-2 space-x-1">
            <span
              v-for="tag in trip.tags"
              :key="tag"
              class="inline-block bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs"
            >
              {{ tag }}
            </span>
          </td>
          <td class="p-2">{{ formatDate(trip.updatedAt) }}</td>
          <td class="p-2 space-x-2">
            <button
              class="text-blue-600 hover:underline"
              @click="$emit('edit-trip', trip)"
            >
              Edit
            </button>
            <button
              class="text-red-600 hover:underline"
              @click="$emit('delete-trip', trip.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile Cards -->
    <div class="grid gap-4 md:hidden">
      <div
        v-for="trip in trips"
        :key="trip.id"
        class="border rounded p-4 flex flex-col"
      >
        <img
          :src="trip.photos[0]"
          class="w-full h-40 object-cover rounded mb-2"
        />
        <router-link
          :to="`/trips/${trip.id}`"
          class="text-blue-600 font-bold hover:underline"
        >
          {{ trip.title }}
        </router-link>
        <div class="flex flex-wrap gap-1 mt-1">
          <span
            v-for="tag in trip.tags"
            :key="tag"
            class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs"
          >
            {{ tag }}
          </span>
        </div>
        <p class="text-gray-400 text-sm mt-1">
          {{ formatDate(trip.updatedAt) }}
        </p>
        <div class="mt-2 flex space-x-2">
          <button
            class="text-blue-600 hover:underline"
            @click="$emit('edit-trip', trip)"
          >
            Edit
          </button>
          <button
            class="text-red-600 hover:underline"
            @click="$emit('delete-trip', trip.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  trips: any[];
  formatDate: (date: string | Date) => string;
}>();

const emit = defineEmits<{
  (e: "edit-trip", trip: any): void;
  (e: "delete-trip", id: number): void;
}>();
</script>
