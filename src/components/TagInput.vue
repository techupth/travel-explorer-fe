<template>
  <div class="flex flex-col gap-2 w-full">
    <!-- Input + Button -->
    <div class="flex items-center gap-2 w-full">
      <input
        type="text"
        v-model="newTag"
        placeholder="Add a tag"
        class="border rounded px-3 py-1 flex-1"
        :class="{ 'border-red-500': error }"
        required
      />
      <button
        type="button"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        @click="addTag"
      >
        Add
      </button>
    </div>

    <p v-if="error" class="text-red-500 text-xs">Tag cannot be empty</p>

    <!-- Tags (badges) -->
    <div class="flex flex-wrap gap-2 mt-1">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="relative bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm"
      >
        {{ tag }}
        <button
          type="button"
          class="absolute top-0 right-0 -mt-1 -mr-4 w-4 h-4 text-[10px] text-blue-700 hover:text-red-600 rounded-full bg-white flex items-center justify-center shadow"
          @click="removeTag(index)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps<{ tags: string[] }>();
const emit = defineEmits(["update:tags"]);

const newTag = ref("");
const error = ref(false);

const addTag = () => {
  const tag = newTag.value.trim();
  if (!tag) {
    error.value = true;
    return;
  }
  if (tag && !props.tags.includes(tag)) {
    emit("update:tags", [...props.tags, tag]);
    newTag.value = "";
  }
};

const removeTag = (index: number) => {
  const updated = [...props.tags];
  updated.splice(index, 1);
  emit("update:tags", updated);
};
</script>
