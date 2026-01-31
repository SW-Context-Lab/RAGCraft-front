import logoutIcon from "../../assets/icons/logout.svg";

function SideBarFooter({ isOpen, onLogout }) {
  return (
    <div className="p-4 border-t border-gray-200">
      <button 
        onClick={onLogout} 
        className={`flex items-center gap-3 text-sm text-gray-500 hover:text-red-500 w-full px-2 py-2 transition-all ${
          isOpen ? "justify-start" : "justify-center"
        }`}
      >
        <img src={logoutIcon} alt="logout" className="w-5 h-5" />
        {isOpen && <span className="font-medium">로그아웃</span>}
      </button>
    </div>
  );
}

export default SideBarFooter;