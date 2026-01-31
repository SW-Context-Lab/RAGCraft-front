import { useState } from "react";
import { createCustomModelApi } from "../../api/customModelApi";

function CustomModelCreateModal({ sources, onClose, onCreated }) {
  const [sourceId, setSourceId] = useState("");
  const [modelType, setModelType] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!sourceId || !modelType || !displayName) {
      alert("소스, 모델 타입, 그리고 모델 이름은 필수입니다.");
      return;
    }

    const res = await createCustomModelApi({
      sourceId: Number(sourceId),
      modelType,
      displayName,
      description,
    });

    if (res.ok) {
      onCreated();
      onClose();
    } else {
      alert("모델 생성에 실패했습니다.");
    }
  };

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* 배경 오버레이*/}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose} 
      />

      {/* 모달 본체*/}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 헤더 영역 */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">커스텀 모델 생성</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* 폼 영역 */}
        <div className="p-6 space-y-5">
          
          {/* 소스 선택 */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700">소스 선택 <span className="text-blue-500">*</span></label>
            <p className="text-sm text-gray-400">모델 학습에 사용할 문서를 선택하세요.</p>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white cursor-pointer"
            >
              <option value="">소스를 선택하세요</option>
              {sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* Model Type */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700">Model Type <span className="text-blue-500">*</span></label>
            <p className="text-sm text-gray-400">생성할 모델의 엔진 종류를 입력하세요.</p>
            <input
              placeholder="예: gemini-2.0-flash"
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700">Display Name <span className="text-blue-500">*</span></label>
            <p className="text-sm text-gray-400">목록에서 보여질 모델의 이름입니다.</p>
            <input
              placeholder="예: 우리팀 정책 문서 RAG"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700">Description</label>
            <p className="text-sm text-gray-400">모델의 용도를 간단히 설명해 주세요 (선택).</p>
            <textarea
              placeholder="예: 2025 사내 규정 PDF 기반 질의응답 모델"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-24 resize-none placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* 푸터 버튼 영역 */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={handleCreate}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md"
          >
            모델 생성
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModelCreateModal;