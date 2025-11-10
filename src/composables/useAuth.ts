// composables/useAuth.ts
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api.ts";

const state = reactive({
  user: null as any,
  isAuthenticated: false,
  isLoading: false,
  error: "",
});

const savedUser = localStorage.getItem("user");
const token = localStorage.getItem("token");
if (token && savedUser) {
  state.user = JSON.parse(savedUser);
  state.isAuthenticated = true;
}

export function useAuth() {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    state.isLoading = true;
    state.error = "";
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      state.user = userData;
      state.isAuthenticated = true;
      router.push("/");
    } catch (err: any) {
      state.error = err.response?.data?.message || "Invalid email or password";
    } finally {
      state.isLoading = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    state.user = null;
    state.isAuthenticated = false;
    router.push("/");
  };

  return {
    state,
    login,
    logout,
  };
}
