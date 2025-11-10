<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">My Trips</h1>
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      @click="$emit('add-trip')"
    >
      Add Destination
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: "add-trip"): void;
}>();
</script>
