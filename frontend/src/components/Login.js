import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";  // Use useNavigate for navigation

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
  
    // Sending request to the server
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Convert data to JSON format
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      if (result.token) { // Check if the token exists in the response
        localStorage.setItem('auth-token', result.token); // Store JWT token in local storage
        console.log('Login Successful:', result); // Debug log to confirm success
        navigate('/'); 
        alert("Login successful!"); // Show success alert
        window.location.reload();
      } else {
        alert('Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log in. Please try again.");
    }
  };
  

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm p-4">
              <h3 className="text-center mb-4">Log in</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember_me"
                  />
                  <label htmlFor="remember_me" className="form-check-label">
                    Keep me logged in
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log in now
                  </button>
                </div>
              </form>
              <hr className="my-4" />
              <div className="text-center">
                <a href="#!" className="link-secondary text-decoration-none">
                  Forgot password?
                </a>
              </div>
              <p className="mt-4 text-center">Or sign in with</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-primary">Google</button>
                <button className="btn btn-outline-primary">Facebook</button>
                <button className="btn btn-outline-primary">Twitter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
