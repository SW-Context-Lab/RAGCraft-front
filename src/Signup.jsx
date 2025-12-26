import { useState } from "react";

function Signup({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      onDone(); // 회원가입 성공 → 로그인 화면
    } else {
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>

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

      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Signup;
