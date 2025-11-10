<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">Confirm Delete</h2>
      <p class="mb-4">Are you sure you want to delete this trip?</p>
      <div class="flex justify-end gap-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-700"
        >
          {{ loading ? "Deleting..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean;
  loading: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();
</script>
