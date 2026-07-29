import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import "./Login.css";
import Background2 from "../assets/Background2.png";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Login() {

  

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

 



  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;   // Double click rokega

  setLoading(true);

  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    localStorage.setItem("userId", res.data.user.id);
    localStorage.setItem("userName", res.data.user.name);

    toast.success(res.data.message);
    navigate("/dashboard");

  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};

  return (

    



<div
  className="login-page"
  style={{
    backgroundImage: `url(${Background2})`,
  }}
>


 {/* Left Side */}
    <div className="welcome-content">
    <h1>
        Welcome To <br />
        <span>StyleVault</span>
    </h1>

    <p>
        Manage your wardrobe smarter.
        <br />
        Sign in to continue your fashion journey.
    </p>

    <div className="welcome-features">

        <div className="item">
            <span>👗</span>

            <div>
                <h4>Organize</h4>
                <p>Keep all your outfits in one place.</p>
            </div>
        </div>

        <div className="item">
            <span>✨</span>

            <div>
                <h4>Create</h4>
                <p>Create & save amazing outfits.</p>
            </div>
        </div>

        <div className="item">
            <span>💜</span>

            <div>
                <h4>Favorites</h4>
                <p>Keep your favorite outfits handy.</p>
            </div>
        </div>

    </div>
</div>

    
     <div className="login-card p-4">

        
        <Logo />

        <form onSubmit={handleSubmit}>

          <div className="mb-3 position-relative">
            <label>Email</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>

              <input
                type="email"
                autoComplete="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);

                  if (!value.includes("@")) {
                    setSuggestions([]);
                    return;
                  }

                  const [name, domain = ""] = value.split("@");

                  const domains = [
                    "gmail.com",
                    "yahoo.com",
                    "outlook.com",
                    "hotmail.com",
                  ];

                  const filtered = domains
                    .filter((d) =>
                      d.toLowerCase().startsWith(domain.toLowerCase())
                    )
                    .map((d) => `${name}@${d}`);

                  setSuggestions(filtered);
                }}
                required
              />

              {suggestions.length > 0 && (
                <div className="email-suggestions">
                  {suggestions.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setEmail(item);
                        setSuggestions([]);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

           <div className="mb-3">
          <label>Password</label>

          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>

              
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

         <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
            />


               <label
              className="form-check-label"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>
           
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

         <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

        <p className="text-center mt-3">
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>
    </div>
  </div>
  );
}

export default Login;