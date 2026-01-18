function CustomModelDetailModal({ model, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* 모델 기본 정보 */}
        <h3>제목: {model.displayName}</h3>
        <p>설명: {model.description}</p>

        <hr />

        {/* 모델 메타 정보 */}
        <p>Model Type: {model.modelType}</p>
        <p>Created At: {model.createdAt}</p>

        <hr />

        {/* 사용 소스 (단일) */}
        <h4>사용 소스</h4>
        <p>{model.source.displayName}</p>
        <p>{model.source.description}</p>

        <br />

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "black",
  padding: 20,
  width: 400,
};

export default CustomModelDetailModal;
