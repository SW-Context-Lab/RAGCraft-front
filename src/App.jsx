import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Auth from "./Auth"
import MainPage from "./main/MainPage";

function App() {
  const [screen, setScreen] = useState("auth");

  if (screen === "auth")
    return (
      // <Login
      //   onSignup={() => setScreen("signup")}
      //   onLogin={() => setScreen("main")}
      // />
      <Auth onLoginSuccess={() => setScreen("main")} />
    );

  // if (screen === "signup")
  //   return <Signup onDone={() => setScreen("login")} />;

  return <MainPage onLogout={() => setScreen("auth")} />;
}

export default App;
