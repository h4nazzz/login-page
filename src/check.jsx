import React from "react";

function Appa({ email, setEmail, password, setPassword, check, loginData, savedEmail, responseMessage }) {
  return (
    <div className="login-container">
      <div className="batman-logo-wrapper">
        {/* Subtle decorative elements for premium look */}
        <div className="bat-sigil"></div>
      </div>
      <h1>Verify Associate Credentials</h1>
      <p className="subtitle">Secure access to the Batcave terminal</p>
      
      <div className="form-group">
        <label>Email Address</label>
        <input 
          type="email" 
          placeholder="e.g. bruce@wayne.com" 
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
      
      <button className="btn btn-secondary" onClick={check}>Verify Credentials</button>
      
      {loginData && (
        <div className="status-box">
          <p className="status-label">Authentication Request Sent:</p>
          <div className="status-details">
            <div><strong>Email:</strong> {savedEmail}</div>
            {responseMessage && (
              <div className={`response-message ${responseMessage.includes("successful") ? "success" : "error"}`}>
                <strong>Status:</strong> {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Appa;