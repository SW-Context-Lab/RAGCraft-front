import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import MainPage from "./MainPage";

function App() {
  const [screen, setScreen] = useState("login");

  if (screen === "login")
    return (
      <Login
        onSignup={() => setScreen("signup")}
        onLogin={() => setScreen("main")}
      />
    );

  if (screen === "signup")
    return <Signup onDone={() => setScreen("login")} />;

  return <MainPage onLogout={() => setScreen("login")} />;
}

export default App;
