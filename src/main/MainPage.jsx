import { useEffect, useState } from "react";
import { useSources } from "../hooks/useSources";
import { useCustomModels } from "../hooks/useCustomModels";

import SourceList from "../components/source/SourceList";
import SourceDetailModal from "../components/source/SourceDetailModal";
import SourceUploadModal from "../components/source/SourceUploadModal";

import CustomModelList from "../components/customModel/CustomModelList";
import CustomModelDetailModal from "../components/customModel/CustomModelDetailModal";
import CustomModelCreateModal from "../components/customModel/CustomModelCreateModal";

function MainPage({ onLogout }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const {
    sources,
    selectedSource,
    loadSources,
    loadSourceDetail,
    closeSourceDetail,
  } = useSources();

  const {
    customModels,
    selectedCustomModel,
    loadCustomModels,
    loadCustomModelDetail,
    closeCustomModelDetail,
  } = useCustomModels();

  useEffect(() => {
    loadSources();
    loadCustomModels();
  }, []);

  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
      <button onClick={() => setShowUpload(true)}>소스 추가</button>
      <button onClick={() => setShowCreateModel(true)}>모델 생성</button>

      <SourceList sources={sources} onSelect={loadSourceDetail} />
      <CustomModelList models={customModels} onSelect={loadCustomModelDetail} />

      {showUpload && (
        <SourceUploadModal
          onClose={() => setShowUpload(false)}
          onUploaded={loadSources}
        />
      )}

      {showCreateModel && (
        <CustomModelCreateModal
          sources={sources}
          onClose={() => setShowCreateModel(false)}
          onCreated={loadCustomModels}
        />
      )}

      {selectedSource && (
        <SourceDetailModal
          source={selectedSource}
          onClose={closeSourceDetail}
        />
      )}

      {selectedCustomModel && (
        <CustomModelDetailModal
          model={selectedCustomModel}
          onClose={closeCustomModelDetail}
        />
      )}
    </>
  );
}

export default MainPage;
