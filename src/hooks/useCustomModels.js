import { useState } from "react";
import {
  fetchCustomModelsApi,
  fetchCustomModelDetailApi,
  deleteCustomModelApi,
} from "../api/customModelApi";

// 커스텀 모델 도메인 상태 관리
export function useCustomModels() {
  const [customModels, setCustomModels] = useState([]);
  const [selectedCustomModel, setSelectedCustomModel] = useState(null);

  const loadCustomModels = async () => {
    setCustomModels(await fetchCustomModelsApi());
  };

  const loadCustomModelDetail = async (id) => {
    setSelectedCustomModel(await fetchCustomModelDetailApi(id));
  };

  const deleteCustomModel = async (id) => {
    await deleteCustomModelApi(id);
  };

  return {
    customModels,
    selectedCustomModel,
    loadCustomModels,
    loadCustomModelDetail,
    deleteCustomModel,
    closeCustomModelDetail: () => setSelectedCustomModel(null),
  };
}
