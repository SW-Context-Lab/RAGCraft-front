import { useEffect, useState } from "react";
import { useSources } from "../hooks/useSources";
import { useCustomModels } from "../hooks/useCustomModels";

// 컴포넌트 임포트
import SideBar from "../components/sideBar/SideBar";
import Chat from "../components/chat/Chat";

import SourceDetailModal from "../components/source/SourceDetailModal";
import SourceUploadModal from "../components/source/SourceUploadModal";

import CustomModelDetailModal from "../components/customModel/CustomModelDetailModal";
import CustomModelCreateModal from "../components/customModel/CustomModelCreateModal";

function MainPage({ onLogout }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState("");

  // Hook 사용
  const {
    sources,
    selectedSource,
    loadSources,
    loadSourceDetail,
    closeSourceDetail,
    deleteSource,
  } = useSources();

  const {
    customModels,
    selectedCustomModel,
    loadCustomModels,
    loadCustomModelDetail,
    closeCustomModelDetail,
    deleteCustomModel,
  } = useCustomModels();

  // 핸들러 함수들
  const handleSourceDelete = async (id) => {
    try {
      await deleteSource(id);
      closeSourceDetail();
      loadSources();
    } catch (error) {
      alert("소스 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleModelDelete = async (id) => {
    try {
      await deleteCustomModel(id);
      closeCustomModelDetail();
      loadCustomModels();
    } catch (error) {
      alert("모델 삭제 중 오류가 발생했습니다.");
    }
  };

  // 새 채팅 핸들러 
  const handleNewChat = () => {
    console.log("New Chat Initiated");
  };

  useEffect(() => {
    loadSources();
    loadCustomModels();
  }, []);

  return (
    <div className="flex h-screen bg-white text-gray-800 overflow-hidden">
      
      <SideBar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={onLogout}
        onUpload={() => setShowUpload(true)}
        onCreateModel={() => setShowCreateModel(true)}
        onNewChat={handleNewChat}
        customModels={customModels}
        loadCustomModelDetail={loadCustomModelDetail}
        onSelectModel={setSelectedModelId}
        sources={sources}
        loadSourceDetail={loadSourceDetail}
      />

      {/* --- 메인 채팅 영역 --- */}
      <main className="flex-1 overflow-hidden">
        <Chat customModels={customModels} selectedModelId={selectedModelId}/>
      </main>

      {/* --- 모달 레이어 --- */}
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
          onDelete={handleSourceDelete}
        />
      )}
      {selectedCustomModel && (
        <CustomModelDetailModal
          model={selectedCustomModel}
          onClose={closeCustomModelDetail}
          onDelete={handleModelDelete}
        />
      )}
    </div>
  );
}

export default MainPage;