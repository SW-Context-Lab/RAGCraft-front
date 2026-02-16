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

// 커스텀 모델 삭제
export const deleteCustomModelApi = async (id) => {
  const response = await fetch(`/api/custom-models/${id}`, { 
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("삭제 중 오류 발생");
  }
  return true;
};

// 채팅
export const queryCustomModelApi = async (id, question) => {
  const response = await fetch(`/api/custom-models/${id}/query`, {
    method: "POST",
    credentials: "include", 
    headers: { 
      "Content-Type": "text/plain" 
    },
    body: question, 
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }
    throw new Error("답변을 받아오지 못했습니다.");
  }

  return response.text();
};

// 채팅 히스토리 불러오기
export const fetchChatHistoryApi = async (modelId) => {
  const response = await fetch(`/api/custom-models/${modelId}/chats`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("채팅 기록을 불러오지 못했습니다.");
  }

  return response.json();
};
