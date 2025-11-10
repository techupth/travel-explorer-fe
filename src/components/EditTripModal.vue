<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-xl relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 class="text-2xl font-bold mb-4">Edit Destination</h2>

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
          ></textarea>
        </div>

        <!-- Tags -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Tags</label>
          <TagInput v-model:tags="form.tags" />
        </div>

        <!-- Latitude / Longitude -->
        <div class="mb-4 flex gap-4">
          <div class="flex-1">
            <label class="block mb-1 text-start">Latitude</label>
            <input
              v-model="form.latitude"
              type="text"
              class="w-full border rounded p-2"
            />
          </div>
          <div class="flex-1">
            <label class="block mb-1 text-start">Longitude</label>
            <input
              v-model="form.longitude"
              type="text"
              class="w-full border rounded p-2"
            />
          </div>
        </div>

        <!-- Photos -->
        <div class="mb-4">
          <label class="block mb-1 text-start">Photos</label>
          <ImageUploadPreview
            v-model:files="form.selectedFiles"
            :existing-urls="existingImages"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loadingEdit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {{
            loadingEdit
              ? `${loadingEditMessage} (${Math.round(progress)}%)`
              : "Update Trip"
          }}
        </button>

        <div v-if="loadingEdit" class="w-full bg-gray-200 h-2 rounded-lg mt-2">
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
import { reactive, ref, watch } from "vue";
import TagInput from "./TagInput.vue";
import ImageUploadPreview from "./ImageUploadPreview.vue";
import { useEditTrip } from "../composables/useEditTrip";

const props = defineProps<{ show: boolean; trip: any }>();
const emit = defineEmits(["close", "updated"]);

const form = reactive({
  title: "",
  description: "",
  tags: [] as string[],
  selectedFiles: [] as File[],
  latitude: "",
  longitude: "",
});

const existingImages = ref<string[]>([]);

const { loadingEdit, progress, loadingEditMessage, submitEdit, setTrip } =
  useEditTrip();

// เมื่อ props.trip เปลี่ยน populate form
watch(
  () => props.trip,
  (trip) => {
    if (trip) {
      setTrip(trip);
      form.title = trip.title;
      form.description = trip.description;
      form.tags = [...trip.tags];
      form.latitude = trip.latitude?.toString() || "";
      form.longitude = trip.longitude?.toString() || "";
      form.selectedFiles = []; // สำหรับรูปใหม่
      existingImages.value.splice(
        0,
        existingImages.value.length,
        ...(trip.photos || [])
      ); // ใส่รูปเดิม
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  try {
    await submitEdit(form, existingImages.value);
    emit("updated"); // ให้ parent refetch trips
    emit("close");
  } catch (err: any) {
    alert(err.message || "Failed to update trip");
  }
};
</script>
