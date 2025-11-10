<template>
  <div class="min-h-screen flex items-start justify-center pt-24">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

      <RegisterForm
        :form="form"
        :errors="errors"
        :backend-error="backendError"
        :success-message="successMessage"
        :is-loading="isLoading"
        @submit="registerUser"
      />

      <!-- Link to Login -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api.ts";
import RegisterForm from "../components/RegisterForm.vue";

interface RegisterForm {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const router = useRouter();

const form = ref<RegisterForm>({
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const backendError = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const validateForm = (): boolean => {
  let valid = true;
  errors.value.email = "";
  errors.value.password = "";
  errors.value.confirmPassword = "";
  backendError.value = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = "Invalid email format";
    valid = false;
  }

  if (form.value.password.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
    valid = false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
    valid = false;
  }

  return valid;
};

const registerUser = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  backendError.value = "";
  successMessage.value = "";

  try {
    const payload = {
      displayName: form.value.displayName,
      email: form.value.email,
      password: form.value.password,
    };

    await api.post("/auth/register", payload);
    successMessage.value = "Account created successfully. Please log in.";

    // Auto redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error: any) {
    if (error.response?.status === 409) {
      backendError.value = "Email already registered";
    } else if (error.response?.data?.message) {
      backendError.value = error.response.data.message;
    } else {
      backendError.value = "Registration failed. Please try again.";
    }
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
