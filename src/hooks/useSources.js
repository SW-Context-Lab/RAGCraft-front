import { useState } from "react";
import {
  fetchSourcesApi,
  fetchSourceDetailApi,
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

  return {
    sources,
    selectedSource,
    loadSources,
    loadSourceDetail,
    closeSourceDetail: () => setSelectedSource(null),
  };
}
