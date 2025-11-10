<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-xl relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 rounded-lg"
      >
        ✕
      </button>
      <h2 class="text-2xl font-bold mb-4">Add New Trip</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Title *</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full border rounded p-2"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Description *</label>
          <textarea
            v-model="form.description"
            class="w-full border rounded p-2"
            required
          ></textarea>
        </div>

        <!-- Tags -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Tags *</label>
          <TagInput v-model:tags="form.tags" />
        </div>

        <!-- Latitude / Longitude -->
        <div class="mb-4 flex gap-4">
          <div class="flex-1">
            <label class="block mb-1 text-start">Latitude *</label>
            <input
              type="text"
              v-model="form.latitude"
              class="w-full border rounded p-2"
              placeholder="e.g. 12.3456"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block mb-1 text-start">Longitude *</label>
            <input
              type="text"
              v-model="form.longitude"
              class="w-full border rounded p-2"
              placeholder="e.g. 102.1234"
            />
          </div>
        </div>

        <!-- Photos -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Photos *</label>
          <ImageUploadPreview v-model:files="form.selectedFiles" />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {{
            loading
              ? `${loadingMessage} (${Math.round(progress)}%)`
              : "Create Trip"
          }}
        </button>

        <div v-if="loading" class="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            class="bg-blue-600 h-2 rounded"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import TagInput from "./TagInput.vue";
import ImageUploadPreview from "./ImageUploadPreview.vue";
import { useCreateTrip } from "../composables/useCreateTrip";

const emit = defineEmits(["close", "added"]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  title: "",
  description: "",
  tags: [] as string[],
  selectedFiles: [] as File[],
  latitude: undefined as Number | undefined,
  longitude: undefined as Number | undefined,
});

const { loading, progress, loadingMessage, submitTrip } = useCreateTrip();

const handleSubmit = async () => {
  try {
    await submitTrip(form);
    emit("added");
    emit("close");

    form.title = "";
    form.description = "";
    form.tags = [];
    form.selectedFiles = [];
    form.latitude = undefined;
    form.longitude = undefined;
  } catch (err: any) {
    alert(err.message);
  }
};
</script>
