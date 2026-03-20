import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // ===== REGISTER =====
  const handleRegister = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "OTP sent to your email") {
        setOtpSent(true);
      }

    } catch (error) {
      console.log(error);
    }

  };

  // ===== VERIFY OTP =====
  const handleVerifyOtp = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "Email verified successfully") {

        setOtpSent(false);

        alert("OTP verified. Now login with your email and password.");

      }

    } catch (error) {
      console.log(error);
    }

  };

  // ===== LOGIN =====
  const handleLogin = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "Login successful") {

        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {!otpSent && (
        <button onClick={handleRegister}>
          Register / Send OTP
        </button>
      )}

      {otpSent && (
        <>
          <br /><br />

          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <br /><br />

          <button onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      <hr />

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;