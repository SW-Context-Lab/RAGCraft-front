import { useEffect, useState } from "react";

function MainPage({ onLogout }) {
  const [sources, setSources] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  // 🔽 소스 추가용 state (빠져 있던 것들)
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");

  // 리스트 조회
  const fetchSources = () => {
    fetch("/api/sources", { credentials: "include" })
      .then((res) => res.json())
      .then(setSources);
  };

  useEffect(fetchSources, []);

  // 로그아웃
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    onLogout();
  };

  // 상세 조회
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

  // 🔽 소스 업로드 로직 (빠져 있던 함수)
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

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => setShowUpload(true)}>소스 추가하기</button>

      <hr />

      <h2>소스 리스트</h2>

      <div>
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
      </div>

      {/* 🔽 소스 추가 모달 */}
      {showUpload && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              color: "black",
              padding: 20,
              width: 400,
              borderRadius: 6,
            }}
          >
            <h3>소스 추가</h3>

            <input
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", marginBottom: 8 }}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: 12 }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setShowUpload(false)}>취소</button>
              <button onClick={handleUpload}>등록</button>
            </div>
          </div>
        </div>
      )}

      {/* 상세 모달 */}
      {selected && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "30%",
            background: "white",
            color: "black",
            border: "1px solid black",
            padding: 20,
            width: "400px",
          }}
        >
          <h3>{selected.displayName}</h3>
          <p>{selected.description}</p>

          <hr />

          <p>원본 파일명: {selected.originalFilename}</p>
          <p>크기: {selected.size}</p>
          <p>타입: {selected.contentType}</p>

          <a href={selected.downloadUrl} target="_blank">
            다운로드
          </a>

          <br />
          <br />

          <button onClick={() => setSelected(null)}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
