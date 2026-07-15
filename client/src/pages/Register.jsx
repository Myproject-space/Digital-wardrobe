import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "${API_URL}//api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h2 className="text-center fw-bold text-primary mb-2">
          ClosetVault
        </h2>

        <p className="text-center text-muted">
          Create Your Account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <label>Full Name</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

             
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label>Confirm Password</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
              required
            />

            <label
              className="form-check-label"
              htmlFor="terms"
            >
              I agree to Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;