import { ref } from "vue";
import { api } from "../api";

export function useEditTrip() {
  const showEditModal = ref(false);
  const loadingEdit = ref(false);
  const progress = ref(0);
  const loadingEditMessage = ref("");

  const currentTrip = ref<any>(null);

  const setTrip = (trip: any) => {
    currentTrip.value = trip;
    showEditModal.value = true;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    currentTrip.value = null;
  };

  const submitEdit = async (formData: any, existingImages: string[] = []) => {
    if (!currentTrip.value) return;
    loadingEdit.value = true;
    progress.value = 0;
    loadingEditMessage.value = "Uploading images...";

    try {
      const uploadedUrls: string[] = [];

      // Upload new files only
      for (let i = 0; i < formData.selectedFiles.length; i++) {
        const file = formData.selectedFiles[i];
        const data = new FormData();
        data.append("file", file);

        const res = await api.post("/files/upload", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        uploadedUrls.push(res.data.url);
        progress.value = ((i + 1) / formData.selectedFiles.length) * 50;
        loadingEditMessage.value = `Uploading ${i + 1}/${
          formData.selectedFiles.length
        } images`;
      }

      // รวม existingImages + uploadedUrls
      const allPhotos = [...existingImages, ...uploadedUrls];

      const tripData = {
        title: formData.title,
        description: formData.description,
        photos: allPhotos,
        tags: formData.tags,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      loadingEditMessage.value = "Updating trip...";
      progress.value = 75;

      const res = await api.put(`/trips/${currentTrip.value.id}`, tripData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      progress.value = 100;
      loadingEditMessage.value = "Trip updated successfully!";

      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Update failed");
    } finally {
      loadingEdit.value = false;
      progress.value = 0;
      loadingEditMessage.value = "";
    }
  };

  return {
    showEditModal,
    currentTrip,
    setTrip,
    loadingEdit,
    progress,
    loadingEditMessage,
    submitEdit,
    closeEditModal,
  };
}
