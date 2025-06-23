import React, { useState } from 'react'
import "../CSS/LoginSignup.css"
import { useNavigate } from 'react-router-dom'

const API_URL = "http://localhost:5000/api";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage(isLogin ? `Welcome back, ${data.user.name}!` : `Welcome, ${data.user.name}!`);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form className='loginsignup-fields' onSubmit={handleSubmit}>
          {!isLogin && (
            <input type='text' placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input type='email' placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} required />
          <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Continue</button>
        </form>
        {message && <p style={{color: message.includes('Welcome') ? 'green' : 'red'}}>{message}</p>}
        <p className="loginsignup-login">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{cursor: 'pointer', color: 'blue'}} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up here" : "Login here"}
          </span>
        </p>
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup