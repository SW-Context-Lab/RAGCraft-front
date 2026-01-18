import { useState } from "react";
import { createCustomModelApi } from "../../api/customModelApi";

function CustomModelCreateModal({ sources, onClose, onCreated }) {
  const [sourceId, setSourceId] = useState("");
  const [modelType, setModelType] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    // 최소 검증: 필수값 누락 방지
    if (!sourceId || !modelType || !displayName) {
      alert("소스 / Model Type / Display Name은 필수임");
      return;
    }

    const res = await createCustomModelApi({
      sourceId: Number(sourceId),
      modelType,
      displayName,
      description,
    });

    if (res.ok) {
      onCreated();
      onClose();
    } else {
      alert("생성 실패");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>커스텀 모델 생성</h3>

        {/* 1) 소스 선택 */}
        <div style={fieldStyle}>
          <label style={labelStyle}>소스 선택</label>
          <p style={hintStyle}>이 모델을 만들 때 사용할 문서(소스)를 선택함</p>

          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            style={inputStyle}
          >
            <option value="">소스 선택</option>
            {sources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* 2) Model Type */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Model Type</label>
          <p style={hintStyle}>
            생성할 모델 종류를 입력함 (예: gemini-2.0-flash 등 서버가 기대하는 값, 근데 지금은 그냥 아무거나 넣으삼 나중에 모델 선택을 위해서 미리 만든거임)
          </p>

          <input
            placeholder="예: gemini-2.0-flash"
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 3) Display Name */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Display Name</label>
          <p style={hintStyle}>목록에서 보여줄 모델 이름임 (사람이 읽기 쉬운 이름)</p>

          <input
            placeholder="예: 우리팀 정책 문서 RAG"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* 4) Description */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Description</label>
          <p style={hintStyle}>이 모델이 무엇을 위한 것인지 간단히 설명함 (선택 입력)</p>

          <textarea
            placeholder="예: 2025 사내 규정 PDF 기반 질의응답 모델"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: 80, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={handleCreate}>생성</button>
          <button onClick={onClose}>취소</button>
        </div>
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
  background: "black", // 입력 가독성 때문에 white 추천함
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
};

export default CustomModelCreateModal;
