import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const sendOTP = async () => {
    if (!email) {
      toast.warning("📧 Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      toast.warning("📧 Please enter a valid email address.");
      return;
    }

    try {
      // Check registered email from MongoDB
      await axios.post(`${API_URL}/api/auth/check-email`, {
        email,
      });

      // Email exists → generate demo OTP
      const otp = Math.floor(
        100000 + Math.random() * 900000
      );

      localStorage.setItem("otp", otp.toString());
      localStorage.setItem("resetEmail", email);

      toast.success(`📩 Demo OTP: ${otp}`);

      navigate("/verify-otp");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center fw-bold text-primary mb-2">
          Style Vault
        </h2>

        <p className="text-center text-muted">
          Reset Your Password
        </p>

        <div className="mb-3">
          <label>Email Address</label>

          <div className="input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>

            <input
  type="email"
  className="form-control"
  placeholder="Enter Registered Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendOTP();
    }
  }}
  required
/>
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={sendOTP}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;