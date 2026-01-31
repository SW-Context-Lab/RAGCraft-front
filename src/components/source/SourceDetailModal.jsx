function SourceDetailModal({ source, onClose, onDelete }) {
  // 파일 크기 포맷팅 함수 (기존 동일)
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 삭제 핸들러 (안전 장치)
  const handleDelete = () => {
    if (window.confirm(`정말로 '${source.displayName}' 소스를 삭제하시겠습니까?\n연결된 모델이 있다면 영향을 받을 수 있습니다.`)) {
      onDelete(source.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 헤더 및 바디 섹션 (기존과 동일) */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold bg-blue-500 px-2 py-1 rounded-md uppercase tracking-wider">Source Info</span>
              <h3 className="text-2xl font-black mt-2 tracking-tight">{source.displayName}</h3>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors text-2xl">×</button>
          </div>
          <p className="text-blue-100 text-sm mt-3 leading-relaxed opacity-90">
            {source.description || "등록된 설명이 없습니다."}
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase px-1">File Details</h4>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex justify-between p-3 bg-gray-50/50">
                <span className="text-xs text-gray-500 font-medium">파일명</span>
                <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{source.originalFilename}</span>
              </div>
              <div className="flex justify-between p-3 bg-white">
                <span className="text-xs text-gray-500 font-medium">파일 크기</span>
                <span className="text-xs font-bold text-gray-700">{formatSize(source.size)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50/50">
                <span className="text-xs text-gray-500 font-medium">파일 타입</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{source.contentType.split('/')[1]}</span>
              </div>
            </div>
          </div>

          <a 
            href={source.downloadUrl} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50/30 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📥</span>
              <span className="text-sm font-bold text-blue-700">원본 파일 다운로드</span>
            </div>
            <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* 푸터 섹션 (삭제 버튼 추가) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-3">
          <button 
            onClick={handleDelete}
            className="px-5 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold hover:bg-red-600 hover:text-white active:scale-95 transition-all text-sm"
          >
            소스 삭제
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

export default SourceDetailModal;