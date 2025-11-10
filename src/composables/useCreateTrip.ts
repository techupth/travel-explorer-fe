import { ref } from "vue";
import { api } from "../api";

export function useCreateTrip() {
  const loading = ref(false);
  const progress = ref(0);
  const loadingMessage = ref("");

  const submitTrip = async (form: {
    title: string;
    description?: string;
    tags: string[];
    selectedFiles: File[];
    latitude?: Number;
    longitude?: Number;
  }) => {
    if (!form.title || !form.selectedFiles.length) return;

    loading.value = true;
    progress.value = 0;
    loadingMessage.value = "Uploading images...";
    const uploadedUrls: string[] = [];

    try {
      for (const [i, file] of form.selectedFiles.entries()) {
        const data = new FormData();
        data.append("file", file);

        const res = await api.post("/files/upload", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        uploadedUrls.push(res.data.url);
        progress.value = ((i + 1) / form.selectedFiles.length) * 50;
        loadingMessage.value = `Uploading ${i + 1}/${
          form.selectedFiles.length
        } images`;
      }

      loadingMessage.value = "Creating trip...";
      progress.value = 75;

      const tripData = {
        title: form.title,
        description: form.description,
        photos: uploadedUrls,
        tags: form.tags,
        latitude: form.latitude,
        longitude: form.longitude,
      };

      await api.post("/trips", tripData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      progress.value = 100;
      loadingMessage.value = "Trip created successfully!";
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || err.message || "Failed to create trip"
      );
    } finally {
      loading.value = false;
    }
  };

  return { loading, progress, loadingMessage, submitTrip };
}
