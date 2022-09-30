import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userId", username);
    setUsername("");
    navigate("/task");
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <label html for="username">
          Your username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
