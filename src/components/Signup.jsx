import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import "../css/Form.css";

const Signup = () => {
  const [username, setUsername] = useState( "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const response = await axios.post(
        "https://karanimisheck22.alwaysdata.net/api/signup",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);


      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      e.target.reset();

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5 page-bg">
      <div className="cards col-md-5 form-card">
        <h1 className="text-center mb-4">Create Account</h1>

        {loading && (
          <div className="loader-top">
            <Loader />
          </div>
        )}

        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>

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
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label>Phone Number</label>
          </div>

          

          <button type="submit" className="btn btn-submit">
            Sign Up
          </button>

          <div className="signup-link mt-3">
            Already have an account? <Link to="/signin">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;