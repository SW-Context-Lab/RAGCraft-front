import menuIcon from "../../assets/icons/menu.svg";

function SideBarHeader({ isOpen, onToggle }) {
  return (
    <div className={`p-4 flex items-center h-16 ${isOpen ? "justify-between" : "justify-center"}`}>
      {isOpen && (
        <h1 className="text-xl font-black text-blue-600 tracking-tighter truncate">
          RAG Craft
        </h1>
      )}
      <button 
        onClick={onToggle}
        className="p-1 hover:bg-gray-200 rounded-md transition-colors"
      >
        <img src={menuIcon} alt="menu" className="w-6 h-6" />
      </button>
    </div>
  );
}

export default SideBarHeader;