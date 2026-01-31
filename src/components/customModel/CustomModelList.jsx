function CustomModelList({ models, onSelect }) {
  return (
    <div className="space-y-2">
      {models.length === 0 ? (
        <p className="text-xs text-gray-400 px-2">생성된 모델이 없습니다.</p>
      ) : (
        models.map((m) => (
          <div
            key={m.id}
            className="group relative flex flex-col p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all cursor-pointer"
            onClick={() => onSelect(m.id)}
          >
            {/* 모델 이름 및 아이콘 */}
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🤖</span>
              <strong className="text-sm font-bold text-gray-700 truncate group-hover:text-blue-600 transition-colors">
                {m.displayName}
              </strong>
            </div>

            {/* 모델 설명 (한 줄로 제한) */}
            <p className="text-xs text-gray-400 mt-1 truncate pl-6">
              {m.description || "설명이 없습니다."}
            </p>

            {/* 우측 상단 상세 버튼 */}
            <button
              className="absolute right-2 top-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
              onClick={(e) => {
                e.stopPropagation(); 
                onSelect(m.id);
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

export default CustomModelList;