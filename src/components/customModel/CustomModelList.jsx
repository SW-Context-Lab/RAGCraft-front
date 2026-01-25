function CustomModelList({ models, onSelect }) {
  return (
    <>
      <h2>커스텀 모델 리스트</h2>
      {models.map((m) => (
        <div
          key={m.id}
          
          style={{ border: "1px solid #999", padding: 12, marginBottom: 8 }}
        >
          <strong>{m.displayName}</strong>
          <p>{m.description}</p>

          {/* 우하단 ... 버튼 */}
          <button
            onClick={() => onSelect(m.id)}
          >
            ⋯
          </button>


        </div>
      ))}
    </>
  );
}

export default CustomModelList;
