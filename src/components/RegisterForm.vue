<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <!-- Display Name -->
    <div class="relative z-0 w-full mb-4">
      <input
        v-model="form.displayName"
        type="text"
        placeholder=" "
        class="peer block w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
      <label
        class="absolute text-gray-500 text-sm duration-300 transform -translate-y-3 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        Display Name
      </label>
    </div>

    <!-- Email -->
    <div class="relative z-0 w-full mb-4">
      <input
        v-model="form.email"
        type="email"
        placeholder=" "
        class="peer block w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
      <label
        class="absolute text-gray-500 text-sm duration-300 transform -translate-y-3 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        Email
      </label>
      <p v-if="errors.email" class="text-red-500 text-xs mt-1">
        {{ errors.email }}
      </p>
    </div>

    <!-- Password -->
    <div class="relative z-0 w-full mb-4">
      <input
        v-model="form.password"
        type="password"
        placeholder=" "
        class="peer block w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
      <label
        class="absolute text-gray-500 text-sm duration-300 transform -translate-y-3 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        Password
      </label>
      <p v-if="errors.password" class="text-red-500 text-xs mt-1">
        {{ errors.password }}
      </p>
    </div>

    <!-- Confirm Password -->
    <div class="relative z-0 w-full mb-4">
      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder=" "
        class="peer block w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
      <label
        class="absolute text-gray-500 text-sm duration-300 transform -translate-y-3 scale-75 top-2 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        Confirm Password
      </label>
      <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <!-- Submit Button -->
    <button
      class="w-full py-2 rounded-lg transition flex items-center justify-center text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      :disabled="isLoading"
    >
      <svg
        v-if="isLoading"
        class="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>{{ isLoading ? "Registering..." : "Register" }}</span>
    </button>

    <!-- Backend Error / Success -->
    <p v-if="backendError" class="text-red-500 mt-2 text-center">
      {{ backendError }}
    </p>
    <p v-if="successMessage" class="text-green-500 mt-2 text-center">
      {{ successMessage }}
    </p>
  </form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface RegisterForm {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const props = defineProps({
  form: {
    type: Object as PropType<RegisterForm>,
    required: true,
  },
  errors: {
    type: Object as PropType<{
      email: string;
      password: string;
      confirmPassword: string;
    }>,
    required: true,
  },
  backendError: String,
  successMessage: String,
  isLoading: Boolean,
});

const emit = defineEmits<{
  (e: "submit"): void;
}>();
</script>
