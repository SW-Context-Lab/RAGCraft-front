import { useState } from "react";
import {
  fetchSourcesApi,
  fetchSourceDetailApi,
  deleteSourceApi,
} from "../api/sourceApi";

// 소스 도메인 상태를 한 덩어리로 관리
export function useSources() {
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);

  const loadSources = async () => {
    setSources(await fetchSourcesApi());
  };

  const loadSourceDetail = async (id) => {
    setSelectedSource(await fetchSourceDetailApi(id));
  };

  const deleteSource = async (id) => {
    await deleteSourceApi(id);
    // 참고: 여기서 직접 loadSources()를 호출해도 되지만, 
    // MainPage의 handleSourceDelete에서 호출하고 있으므로 실행만 보장하면 됩니다.
  };

  return {
    sources,
    selectedSource,
    loadSources,
    loadSourceDetail,
    deleteSource,
    closeSourceDetail: () => setSelectedSource(null),
  };
}
