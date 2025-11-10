<template>
  <nav
    class="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50 rounded-lg"
  >
    <router-link
      to="/"
      class="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
    >
      Travel Explorer
    </router-link>

    <div class="flex items-center space-x-6">
      <template v-if="auth.state.isAuthenticated">
        <router-link
          to="/Dashboard"
          class="text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
        >
          Dashboard
        </router-link>
        <button
          @click="auth.logout"
          class="text-gray-700 hover:bg-gray-200 transition duration-200 rounded-lg"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <router-link
          to="/login"
          class="text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
        >
          Register
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuth } from "../composables/useAuth";
const auth = useAuth();
</script>
