function SourceList({ sources, onSelect }) {
  return (
    <div className="space-y-2">
      {sources.length === 0 ? (
        <p className="text-xs text-gray-400 px-2">등록된 소스가 없습니다.</p>
      ) : (
        sources.map((s) => (
          <div
            key={s.id}
            className="group relative flex flex-col p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all cursor-pointer"
            onClick={() => onSelect(s.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-sm">📄</span>
              <strong className="text-sm font-bold text-gray-700 truncate group-hover:text-blue-600 transition-colors">
                {s.displayName}
              </strong>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-1 truncate pl-6">
              {s.originalFilename}
            </p>

            {/* 상세 보기 버튼 */}
            <button
              className="absolute right-2 top-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:bg-white hover:text-blue-600 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(s.id);
              }}
            >
              <span className="font-bold text-lg mb-2">⋯</span>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SourceList;