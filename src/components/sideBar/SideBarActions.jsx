function SideBarActions({ onUpload, onCreateModel, onNewChat }) {
    return (
      <>
        <button 
          onClick={onUpload}
          className="w-full py-2.5 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition-all text-left truncate mb-2"
        >
          소스 추가
        </button>
        <button 
          onClick={onCreateModel}
          className="w-full py-2.5 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition-all text-left truncate"
        >
          커스텀 모델 생성
        </button>
  
        <div className="py-4 border-b border-gray-200">
          <button 
            onClick={onNewChat}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-md text-sm font-bold hover:bg-blue-100 transition-all"
          >
            + 새 채팅
          </button>
        </div>
      </>
    );
  }
  
  export default SideBarActions;