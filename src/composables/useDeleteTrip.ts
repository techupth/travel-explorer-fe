import { ref } from "vue";
import { api } from "../api";
export function useDeleteTrip() {
  const showDeleteModal = ref(false);
  const tripToDelete = ref<number | null>(null);
  const loadingDelete = ref(false);

  const confirmDelete = (id: number) => {
    tripToDelete.value = id;
    showDeleteModal.value = true;
  };

  const deleteTrip = async (onSuccess?: () => void) => {
    if (!tripToDelete.value) return;

    loadingDelete.value = true;
    try {
      await api.delete(`trips/${tripToDelete.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      showDeleteModal.value = false;
      tripToDelete.value = null;

      // Callback ให้ parent รีเฟรช list
      if (onSuccess) onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete trip");
    } finally {
      loadingDelete.value = false;
    }
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    tripToDelete.value = null;
  };

  return {
    showDeleteModal,
    tripToDelete,
    confirmDelete,
    deleteTrip,
    closeDeleteModal,
    loadingDelete,
  };
}
