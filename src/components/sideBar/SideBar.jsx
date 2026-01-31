import SideBarHeader from "./SideBarHeader";
import SideBarActions from "./SideBarActions";
import SideBarFooter from "./SideBarFooter";
import CustomModelList from "../customModel/CustomModelList";
import SourceList from "../source/SourceList";

function Sidebar({
  isOpen,
  setIsOpen,
  onLogout,
  onUpload,
  onCreateModel,
  onNewChat,
  customModels,
  loadCustomModelDetail,
  sources,
  loadSourceDetail
}) {
  return (
    <aside 
      className={`border-r border-gray-200 flex flex-col bg-[#f9f9f9] transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* 1. 헤더 */}
      <SideBarHeader isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      {/* 2. 메인 컨텐츠 */}
      <div className={`px-4 space-y-2 flex-1 overflow-y-auto transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        
        {/* 액션 버튼들 */}
        <SideBarActions 
          onUpload={onUpload} 
          onCreateModel={onCreateModel} 
          onNewChat={onNewChat} 
        />

        {/* 네비게이션 리스트 */}
        <nav className="mt-4 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase">Custom Models</p>
            <CustomModelList models={customModels} onSelect={loadCustomModelDetail} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase">Sources</p>
            <SourceList sources={sources} onSelect={loadSourceDetail} />
          </div>
        </nav>
      </div>

      {/* 3. 푸터 */}
      <SideBarFooter isOpen={isOpen} onLogout={onLogout} />
    </aside>
  );
}

export default Sidebar;