// 소스 관련 API만 담당

export const fetchSourcesApi = async () => {
  const res = await fetch("/api/sources", { credentials: "include" });
  return res.json();
};

export const fetchSourceDetailApi = async (id) => {
  const res = await fetch(`/api/sources/${id}`, {
    credentials: "include",
  });
  return res.json();
};

export const uploadSourceApi = async (formData) => {
  return fetch("/api/sources", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
};

export const deleteSourceApi = async (id) => {
  const res = await fetch(`/api/sources/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res; 
};