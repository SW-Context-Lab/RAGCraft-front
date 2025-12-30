import { useEffect, useState } from "react";

function MainPage({ onLogout }) {
  const [sources, setSources] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  // 소스 업로드용
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  // 커스텀 모델 생성용
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [modelSourceId, setModelSourceId] = useState("");
  const [modelType, setModelType] = useState("");
  const [modelDisplayName, setModelDisplayName] = useState("");
  const [modelDescription, setModelDescription] = useState("");

  // 커스텀 모델 리스트
  const [customModels, setCustomModels] = useState([]);

  // 🔽 커스텀 모델 상세
  const [selectedCustomModel, setSelectedCustomModel] = useState(null);

  /* =====================
     API
  ===================== */
  const fetchSources = () => {
    fetch("/api/sources", { credentials: "include" })
      .then((res) => res.json())
      .then(setSources);
  };

  const fetchCustomModels = () => {
    fetch("/api/custom-models", { credentials: "include" })
      .then((res) => res.json())
      .then(setCustomModels);
  };

  useEffect(() => {
    fetchSources();
    fetchCustomModels();
  }, []);

  /* =====================
     로그아웃
  ===================== */
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    onLogout();
  };

  /* =====================
     소스 상세
  ===================== */
  const fetchSourceDetail = async (id) => {
    const res = await fetch(`/api/sources/${id}`, {
      credentials: "include",
    });

    if (res.ok) {
      setSelected(await res.json());
    } else {
      alert("상세 조회 실패");
    }
  };

  /* =====================
     커스텀 모델 상세
  ===================== */
  const fetchCustomModelDetail = async (id) => {
    const res = await fetch(`/api/custom-models/${id}`, {
      credentials: "include",
    });

    if (res.ok) {
      setSelectedCustomModel(await res.json());
    } else {
      alert("커스텀 모델 상세 조회 실패");
    }
  };

  /* =====================
     소스 업로드
  ===================== */
  const handleUpload = async () => {
    if (!file || !displayName) {
      alert("파일과 Display Name 필수");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("displayName", displayName);
    formData.append("description", description);

    const res = await fetch("/api/sources", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.ok) {
      setFile(null);
      setDisplayName("");
      setDescription("");
      setShowUpload(false);
      fetchSources();
    } else {
      alert("업로드 실패");
    }
  };

  /* =====================
     커스텀 모델 생성
  ===================== */
  const handleCreateModel = async () => {
    if (!modelSourceId || !modelType || !modelDisplayName) {
      alert("필수 항목 누락");
      return;
    }

    const res = await fetch("/api/custom-models", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceId: Number(modelSourceId),
        modelType,
        displayName: modelDisplayName,
        description: modelDescription,
      }),
    });

    if (res.ok) {
      setShowCreateModel(false);
      setModelSourceId("");
      setModelType("");
      setModelDisplayName("");
      setModelDescription("");
      fetchCustomModels();
    } else {
      alert("커스텀 모델 생성 실패");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => setShowUpload(true)}>소스 추가하기</button>
      <button onClick={() => setShowCreateModel(true)}>커스텀 모델 생성</button>

      <hr />

      {/* =====================
          소스 리스트
      ===================== */}
      <h2>소스 리스트</h2>
      {sources.map((s) => (
        <div
          key={s.id}
          onClick={() => fetchSourceDetail(s.id)}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
        >
          <strong>{s.displayName}</strong>
          <p style={{ margin: "4px 0" }}>{s.description}</p>
        </div>
      ))}

      <hr />

      {/* =====================
          커스텀 모델 리스트
      ===================== */}
      <h2>커스텀 모델 리스트</h2>

      {customModels.length === 0 && <p>생성된 커스텀 모델이 없습니다.</p>}

      {customModels.map((m) => (
        <div
          key={m.id}
          onClick={() => fetchCustomModelDetail(m.id)}
          style={{
            border: "1px solid #999",
            padding: "12px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
        >
          <strong>{m.displayName}</strong>
          <p style={{ margin: "4px 0" }}>{m.description}</p>
        </div>
      ))}

      {/* =====================
          소스 추가 모달
      ===================== */}
      {showUpload && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>소스 추가</h3>

            <input
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={inputStyle}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: 12 }}
            />

            <button onClick={handleUpload}>등록</button>
            <button onClick={() => setShowUpload(false)}>취소</button>
          </div>
        </div>
      )}

      {/* =====================
          커스텀 모델 생성 모달
      ===================== */}
      {showCreateModel && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>커스텀 모델 생성</h3>

            <select
              value={modelSourceId}
              onChange={(e) => setModelSourceId(e.target.value)}
              style={inputStyle}
            >
              <option value="">소스 선택</option>
              {sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayName}
                </option>
              ))}
            </select>

            <input
              placeholder="Model Type"
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Display Name"
              value={modelDisplayName}
              onChange={(e) => setModelDisplayName(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={modelDescription}
              onChange={(e) => setModelDescription(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleCreateModel}>생성</button>
            <button onClick={() => setShowCreateModel(false)}>취소</button>
          </div>
        </div>
      )}

      {/* =====================
          커스텀 모델 상세 모달
      ===================== */}
      {selectedCustomModel && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>{selectedCustomModel.displayName}</h3>
            <p>{selectedCustomModel.description}</p>

            <hr />

            <p>Model Type: {selectedCustomModel.modelType}</p>
            <p>Created At: {selectedCustomModel.createdAt}</p>

            <hr />

            <h4>사용 소스</h4>
            <p>{selectedCustomModel.source.displayName}</p>
            <p>{selectedCustomModel.source.description}</p>

            <button onClick={() => setSelectedCustomModel(null)}>닫기</button>
          </div>
        </div>
      )}

      {/* =====================
          소스 상세 모달
      ===================== */}
      {selected && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>{selected.displayName}</h3>
            <p>{selected.description}</p>

            <hr />

            <p>원본 파일명: {selected.originalFilename}</p>
            <p>크기: {selected.size}</p>
            <p>타입: {selected.contentType}</p>

            <a href={selected.downloadUrl} target="_blank" rel="noreferrer">
              다운로드
            </a>

            <br />
            <br />

            <button onClick={() => setSelected(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================
   공통 스타일
===================== */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  color: "black",
  padding: 20,
  width: 400,
  borderRadius: 6,
};

const inputStyle = {
  width: "100%",
  marginBottom: 8,
};

export default MainPage;
