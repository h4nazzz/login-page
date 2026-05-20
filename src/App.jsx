import React, { useState } from "react";
import Appa from "./check.jsx";
import Apps from "./login.jsx";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function check() {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }
    console.log("Check attempt for: ", email);
    setLoginData(true);
    setSavedEmail(email);
    setSavedPassword(password);
    setResponseMessage("Contacting Oracle database...");

    try {
      const response = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Response from server: ", data.message);
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Connection error:", error);
      setResponseMessage("Failed to connect to Gotham servers.");
    }
    setEmail("");
    setPassword("");
  }

  async function login() {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }
    console.log("Registration attempt for: ", email);
    setLoginData(true);
    setSavedEmail(email);
    setSavedPassword(password);
    setResponseMessage("Enrolling new associate...");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log("Response from server: ", data.message);
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Connection error:", error);
      setResponseMessage("Failed to connect to Gotham servers.");
    }
    setEmail("");
    setPassword("");
  }

  const handleTabChange = (loginTab) => {
    setIsLogin(loginTab);
    setEmail("");
    setPassword("");
    setLoginData(false);
    setResponseMessage("");
  };

  return (
    <div className="all">
      <div className="batman-header">
        <div className="batman-badge">BATMAN INITIATIVE</div>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${isLogin ? "active" : ""}`} 
          onClick={() => handleTabChange(true)}
        >
          Register Associate
        </button>
        <button 
          className={`tab-btn ${!isLogin ? "active" : ""}`} 
          onClick={() => handleTabChange(false)}
        >
          Verify Credentials
        </button>
      </div>

      <div className="card-content">
        {isLogin ? (
          <Apps 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            login={login}
            loginData={loginData}
            savedEmail={savedEmail}
            responseMessage={responseMessage}
          />
        ) : (
          <Appa 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            check={check}
            loginData={loginData}
            savedEmail={savedEmail}
            responseMessage={responseMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;