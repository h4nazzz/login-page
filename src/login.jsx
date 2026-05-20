import React from "react";

function Apps({ email, setEmail, password, setPassword, login, loginData, savedEmail, responseMessage }) {
  return (
    <div className="login-container">
      <div className="batman-logo-wrapper">
        <div className="bat-sigil"></div>
      </div>
      <h1>Join Batman Associates</h1>
      <p className="subtitle">Become a protector of Gotham City</p>
      
      <div className="form-group">
        <label>Email Address</label>
        <input 
          type="email" 
          placeholder="e.g. robin@gotham.pd" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      
      <button className="btn btn-primary" onClick={login}>Register Account</button>
      
      {loginData && (
        <div className="status-box">
          <p className="status-label">Associate Registration Request:</p>
          <div className="status-details">
            <div><strong>Email:</strong> {savedEmail}</div>
            {responseMessage && (
              <div className={`response-message ${responseMessage.includes("created") ? "success" : "error"}`}>
                <strong>Status:</strong> {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Apps;