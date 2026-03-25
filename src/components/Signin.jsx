import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import "../css/Form.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // Remember Me
  const [showPassword, setShowPassword] = useState(false); // Show/hide password

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://karanimisheck22.alwaysdata.net/api/signin",
        data
      );

      setLoading(false);
      setSuccess(response.data.message);

      if (remember) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

      setEmail("");
      setPassword("");
      e.target.reset();

      setTimeout(() => setSuccess(""), 5000);

      // Redirect if user exists
      if (response.data.user) {
        navigate("/");
      } else {
        setError(response.data.message);
      }

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5 page-bg">
      <div className="cards col-md-5 form-card">
        <h1 className="text-center mb-3 text-warning">Welcome Back</h1>
        <h3 className="text-center mb-4 text-light">Sign In</h3>

        {loading && <div className="loader-top"><Loader /></div>}
        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handlesubmit}>

          <div className="form-group">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Remember Me */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          <button type="submit" className="btn-submit w-100">Sign In</button>
        </form>

        <div className="signup-link mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;