import { useState } from "react";
import { uploadSourceApi } from "../../api/sourceApi";

/**
 * 소스 업로드 전용 모달
 * - PDF 등 원본 문서를 업로드하고
 * - 이후 커스텀 모델 생성 시 참조되는 "소스"를 생성함
 */
function SourceUploadModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    // 최소 검증
    if (!file || !displayName) {
      alert("파일과 Display Name은 필수임");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("displayName", displayName);
    formData.append("description", description);

    const res = await uploadSourceApi(formData);

    if (res.ok) {
      onUploaded(); // 부모에서 소스 목록 다시 불러오기
      onClose();
    } else {
      alert("소스 업로드 실패");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>소스 추가</h3>

        {/* 1) Display Name */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Display Name</label>
          <p style={hintStyle}>
            소스 목록에서 보여질 이름임 (사람이 알아보기 쉽게 작성)
          </p>

          <input
            placeholder="예: 2025 사내 규정 PDF"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 2) Description */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Description</label>
          <p style={hintStyle}>
            이 문서가 어떤 내용인지 간단히 설명함 (선택 입력)
          </p>

          <textarea
            placeholder="예: 사내 인사 / 복지 / 근무 규정이 포함된 문서"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: 80, resize: "vertical" }}
          />
        </div>

        {/* 3) 파일 업로드 */}
        <div style={fieldStyle}>
          <label style={labelStyle}>파일 선택</label>
          <p style={hintStyle}>
            업로드할 원본 문서를 선택함 (현재는 PDF만 사용 예정)
          </p>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={handleUpload}>등록</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

/* =====================
   스타일
===================== */

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
  color: "white",
  padding: 20,
  width: 420,
  borderRadius: 8,
};

const fieldStyle = {
  marginBottom: 12,
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  marginBottom: 4,
};

const hintStyle = {
  margin: "0 0 6px 0",
  fontSize: 12,
  opacity: 0.75,
};

const inputStyle = {
  width: "100%",
  padding: 8,
  boxSizing: "border-box",
  background: "#111",
  color: "white",
  border: "1px solid #444",
};

export default SourceUploadModal;
