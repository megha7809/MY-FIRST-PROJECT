import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleFormData = async (e) => {
    e.preventDefault();
    const apiUrl = isManager 
      ? 'http://localhost:5000/api/manager/login' 
      : 'http://localhost:5000/api/login';

    try {
      const user = { email, password };
      const response = await axios.post(apiUrl, user);

      if (response.data.msg === "success") {
        // Store the auth token and user type
        login(response.data.token || 'dummy-token', isManager);
        window.alert(isManager ? "Welcome Manager!" : "Welcome Back!");
        navigate(isManager ? '/manager' : '/menu');
      } else {
        window.alert("Username or password incorrect");
      }
    } catch (error) {
      console.error('Login error:', error);
      setErr('Login failed. Please try again.');
    }
  }
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-sm-12 login ">
          <img src="/flower.png" style={{ position: "absolute", zIndex: 1, right: "0", bottom: "0" }} height={"250px"} alt="" />
          <img src="/flower2.png" style={{ position: "absolute", zIndex: 1, left: "0", top: "0" }} height={"250px"} alt="" />

          <form onSubmit={handleFormData} className='p-4'>
            <h3 className='text-center'>Login</h3>
            <br />

            <div className="mb-3 d-flex justify-content-center gap-4">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="customerLogin"
                  checked={!isManager}
                  onChange={() => setIsManager(false)}
                  name="loginType"
                />
                <label className="form-check-label" htmlFor="customerLogin">
                  Customer Login
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="managerLogin"
                  checked={isManager}
                  onChange={() => setIsManager(true)}
                  name="loginType"
                />
                <label className="form-check-label" htmlFor="managerLogin">
                  Manager Login
                </label>
              </div>
            </div>

            <input 
              type="email" 
              placeholder="Email" 
              style={{ color: 'white' }} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-control rounded-3 border border-secondary bg-transparent" 
            />
            <br />
            <input 
              type="password" 
              placeholder="Password" 
              style={{ color: 'white' }} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-control rounded-3 border border-secondary bg-transparent" 
            />
            <br />
            <p className='text-danger'>{err}</p>
            <input 
              type="submit" 
              value={isManager ? "Login as Manager" : "Login as Customer"} 
              className="form-control btn btn-primary" 
            />
            <br /><br />
            {!isManager && (
              <div className="w-100 text-center">
                Need an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login