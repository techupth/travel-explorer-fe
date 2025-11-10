<template>
  <div class="flex gap-3">
    <label
      class="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
    >
      <span class="text-3xl text-gray-400">+</span>
      <span class="text-gray-500 text-sm mt-1">Upload</span>
      <input
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFiles"
      />
    </label>
    <div v-if="files.length" class="mt-2 flex flex-wrap gap-2">
      <div v-for="(file, index) in files" :key="index" class="relative">
        <img
          :src="file.preview"
          class="w-24 h-24 object-cover rounded border"
        />
        <button
          @click="removeFile(index)"
          class="absolute top-0 right-0 -mt-1 -mr-2 w-5 h-5 text-[10px] text-blue-700 hover:text-red-600 rounded-full bg-white flex items-center justify-center shadow"
        >
          ✕
        </button>
      </div>
    </div>
    <div v-if="existingUrls.length" class="mt-2 flex flex-wrap gap-2">
      <div v-for="(url, index) in existingUrls" :key="url" class="relative">
        <img :src="url" class="w-24 h-24 object-cover rounded border" />
        <button
          @click="removeExisting(index)"
          class="absolute top-0 right-0 -mt-1 -mr-2 w-5 h-5 text-[10px] text-blue-700 hover:text-red-600 rounded-full bg-white flex items-center justify-center shadow"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";

const props = defineProps<{
  files: File[];
  existingUrls?: string[];
}>();

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();

const files = ref<File[]>(props.files || []);
const existingUrls = ref<string[]>(props.existingUrls || []);
// Watch props changes
watch(
  () => props.files,
  (newFiles) => {
    files.value = newFiles || [];
  }
);

watch(
  () => props.existingUrls,
  (newUrls) => {
    existingUrls.value = newUrls || [];
  }
);
// Handle new file selection
const handleFiles = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files).map((file) => {
      (file as any).preview = URL.createObjectURL(file);
      return file;
    });
    files.value = [...files.value, ...newFiles];
    emit("update:files", files.value);
  }
};

// Remove new file
const removeFile = (index: number) => {
  const removed = files.value.splice(index, 1)[0];
  URL.revokeObjectURL((removed as any).preview);
  emit("update:files", files.value); // อัพเดตให้ parent ด้วย
};

// Remove existing URL (Edit)
const removeExisting = (index: number) => {
  existingUrls.value.splice(index, 1);
};
</script>
