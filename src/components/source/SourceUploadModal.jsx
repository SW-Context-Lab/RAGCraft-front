import { useState } from "react";
import { uploadSourceApi } from "../../api/sourceApi";

function SourceUploadModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!file || !displayName) {
      alert("파일과 Display Name은 필수입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("displayName", displayName);
    formData.append("description", description);

    const res = await uploadSourceApi(formData);

    if (res.ok) {
      onUploaded();
      onClose();
    } else {
      alert("소스 업로드 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/*  배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose} 
      />

      {/* 모달 카드 */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">소스 추가</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* 폼 영역 */}
        <div className="p-6 space-y-5">
          
          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700 flex items-center gap-1">
              Display Name <span className="text-blue-500">*</span>
            </label>
            <p className="text-sm text-gray-400">
              소스 목록에서 보여질 이름입니다.
            </p>
            <input
              placeholder="예: 2025 사내 규정 PDF"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700">Description</label>
            <p className="text-sm text-gray-400">
              이 문서에 대한 간단한 설명입니다 (선택)
            </p>
            <textarea
              placeholder="예: 사내 인사 / 복지 / 근무 규정이 포함된 문서"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-24 resize-none placeholder:text-gray-300"
            />
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-1.5">
            <label className="text-lg font-bold text-gray-700 flex items-center gap-1">
              파일 선택 <span className="text-blue-500">*</span>
            </label>
            
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 group-hover:text-blue-600">
                  {file ? (
                    <span className="font-bold text-blue-600">{file.name}</span>
                  ) : (
                    <span>클릭하여 파일을 선택하세요</span>
                  )}
                </p>
                <p className="text-xs text-gray-400 uppercase">PDF ONLY</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={handleUpload}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md"
          >
            소스 등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default SourceUploadModal;