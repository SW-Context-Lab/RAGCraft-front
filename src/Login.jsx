import { useState } from "react";

function Login({ onSignup, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      onLogin(); // 그냥 성공 처리
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>로그인</button>
      <button onClick={onSignup}>회원가입</button>
    </div>
  );
}

export default Login;
