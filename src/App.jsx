import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Auth from "./Auth"
import MainPage from "./pages/MainPage";

function App() {
  const [screen, setScreen] = useState("null");

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setScreen("main");
        else setScreen("auth");
      })
      .catch(() => setScreen("auth"));
  }, []);

  if (screen === "null") return <div>로딩중...</div>;

  if (screen === "auth")
    return <Auth onLoginSuccess={() => setScreen("main")} />;

  return <MainPage onLogout={() => setScreen("auth")} />;
}

export default App;
