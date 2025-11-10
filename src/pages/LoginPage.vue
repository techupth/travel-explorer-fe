<template>
  <div class="min-h-screen flex items-start justify-center pt-24">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div class="relative z-0 w-full mb-4">
          <input
            v-model="email"
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
        </div>

        <!-- Password -->
        <div class="relative z-0 w-full mb-4">
          <input
            v-model="password"
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
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 rounded-lg transition flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="auth.isLoading"
        >
          <svg
            v-if="auth.isLoading"
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
          <span>{{ auth.isLoading ? "Logging in..." : "Login" }}</span>
        </button>
      </form>

      <!-- Link to Register -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        Don't have an account?
        <router-link to="/register" class="text-green-600 hover:underline">
          Register
        </router-link>
      </p>

      <!-- Error Message -->
      <p v-if="auth.error" class="text-red-500 mt-2 text-center">
        {{ auth.error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

const auth = useAuth();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  await auth.login(email.value, password.value);
};
</script>

<style scoped></style>
