import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/login/Login";
import { Router } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./components/register/Register";
import authService from "./authService";
import { runInAction } from "mobx";
import userStore from "./userStore";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    let auth = authService.getCurrentUser();
    runInAction(() => {
      userStore.token = auth.token;
      userStore.user_id = auth.user_id;
    });
  });

  function closeLogin() {
    setShowLogin(false);
  }
  function openLogin() {
    setShowLogin(true);
  }
  function closeRegister() {
    setShowRegister(false);
  }
  function openRegister() {
    setShowRegister(true);
  }
  function switchToLogin() {
    closeRegister();
    openLogin();
  }
  function switchToRegister() {
    closeLogin();
    openRegister();
  }
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className="main-content"></div>
      {showLogin && (
        <Login close={closeLogin} switchToRegister={switchToRegister} />
      )}
      {showRegister && (
        <Register close={closeRegister} switchToLogin={switchToLogin} />
      )}
    </div>
  );
}

export default App;
