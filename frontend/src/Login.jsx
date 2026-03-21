import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // ===== Register / Login state =====
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // ===== LOCAL TEST BASE_URL =====
  const BASE_URL = "http://localhost:5000"; // local backend
  // const BASE_URL = "https://cloud-storage-backend.onrender.com"; // live backend

  // ===== REGISTER =====
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Register button clicked");
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      console.log("Register response:", data);
      alert(data.message);

      if (data.message === "OTP sent to your email") {
        setOtpSent(true);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Error: " + error.message);
    }
  };

  // ===== VERIFY OTP =====
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      console.log("Verify OTP clicked");
      const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) throw new Error("Failed to verify OTP");

      const data = await res.json();
      console.log("OTP response:", data);
      alert(data.message);

      if (data.message === "Email verified successfully") {
        setOtpSent(false);
        alert("OTP verified. Now login with your email and password.");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Error: " + error.message);
    }
  };

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      console.log("Login button clicked");
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("Login response:", data);
      alert(data.message);

      if (data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      {!otpSent && (
        <button onClick={handleRegister}>Register / Send OTP</button>
      )}
      {otpSent && (
        <>
          <br /><br />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br /><br />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
      <hr />
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;