import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import Background from "../assets/Background.jpg";
import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Login() {

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);

      alert(res.data.message);
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
        }}
      >
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

            <Link
              to="/forgot-password"
              className="text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
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