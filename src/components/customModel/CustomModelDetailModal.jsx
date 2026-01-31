function CustomModelDetailModal({ model, onClose, onDelete }) {
  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm(`정말로 '${model.displayName}' 모델을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      onDelete(model.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 헤더 및 바디 섹션 */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold bg-blue-500 px-2 py-1 rounded-md uppercase tracking-wider">Model Detail</span>
              <h3 className="text-2xl font-black mt-2 tracking-tight">{model.displayName}</h3>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors text-2xl">×</button>
          </div>
          <p className="text-blue-100 text-sm mt-3 leading-relaxed opacity-90">
            {model.description || "등록된 설명이 없습니다."}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Model Type</label>
              <p className="text-sm font-bold text-gray-700 mt-1">{model.modelType}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Created At</label>
              <p className="text-sm font-bold text-gray-700 mt-1">
                {new Date(model.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase px-1">Linked Source</h4>
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 flex items-start gap-3">
              <span className="text-xl">📄</span>
              <div>
                <p className="text-sm font-bold text-blue-700">{model.source.displayName}</p>
                <p className="text-xs text-blue-500/70 mt-1 leading-relaxed">
                  {model.source.description || "소스 설명이 없습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 섹션 */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-3">
          <button 
            onClick={handleDelete}
            className="px-5 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold hover:bg-red-600 hover:text-white active:scale-95 transition-all text-sm"
          >
            모델 삭제
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-black active:scale-95 transition-all text-sm shadow-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModelDetailModal;