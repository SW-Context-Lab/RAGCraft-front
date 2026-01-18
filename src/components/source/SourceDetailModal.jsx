function SourceDetailModal({ source, onClose }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>제목: {source.displayName}</h3>
        <p>설명: {source.description}</p>

        <p>원본 파일명: {source.originalFilename}</p>
        <p>크기: {source.size}</p>
        <p>타입: {source.contentType}</p>

        <a href={source.downloadUrl} target="_blank" rel="noreferrer">
          다운로드
        </a>

        <br /><br />
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

export default SourceDetailModal;
