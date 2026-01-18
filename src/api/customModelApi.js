// 커스텀 모델 관련 API만 담당

export const fetchCustomModelsApi = async () => {
  const res = await fetch("/api/custom-models", {
    credentials: "include",
  });
  return res.json();
};

export const fetchCustomModelDetailApi = async (id) => {
  const res = await fetch(`/api/custom-models/${id}`, {
    credentials: "include",
  });
  return res.json();
};

export const createCustomModelApi = async (payload) => {
  return fetch("/api/custom-models", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
