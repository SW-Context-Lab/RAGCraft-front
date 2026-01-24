import { useState } from "react";

function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        ...(isLogin && { credentials: "include" }),
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        if (isLogin) {
          alert("로그인 성공");
          onLoginSuccess(); 
        } else {
          alert("회원가입 성공");
          setMode("login"); 
        }
      } else {
        alert(`${isLogin ? "로그인" : "회원가입"} 실패`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl mb-10 font-extrabold text-center tracking-tight text-blue-600 text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000">
            RAG Craft
      </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-2xl">
        {/* 로그인/회원가입 선택 탭 */}
        <div className="flex mb-8 ">
          <button   
            className={`flex-1 py-3 text-lg font-bold transition-colors ${
              isLogin ? "text-black border-b-2 border-blue-600 bg-white" : "text-gray-400"
            }`}
            onClick={() => setMode("login")}
          >
            로그인
          </button>
          <button
            className={`flex-1 py-3 text-lg font-bold transition-colors ${
              !isLogin ? "text-black border-b-2 border-blue-600" : "text-gray-400"
            }`}
            onClick={() => setMode("signup")}
          >
            회원가입
          </button>
        </div>

        {/* 이메일/비번 입력 폼 */}
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 제출 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            {isLogin ? "로그인" : "회원가입"}
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-500">
          {isLogin ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setMode(isLogin ? "signup" : "login")}
          >
            {isLogin ? "회원가입" : "로그인"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;