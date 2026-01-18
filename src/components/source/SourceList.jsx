// 소스 목록 렌더링만 담당

function SourceList({ sources, onSelect }) {
  return (
    <>
      <h2>소스 리스트</h2>
      {sources.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 8,
            cursor: "pointer",
          }}
        >
          <strong>{s.displayName}</strong>
          <p>{s.description}</p>
        </div>
      ))}
    </>
  );
}

export default SourceList;
