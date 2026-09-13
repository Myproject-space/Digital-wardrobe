import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (newPassword === "" || confirmPassword === "") {
      toast.warning("⚠️ Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    const resetEmail = localStorage.getItem("resetEmail");

    if (!resetEmail) {
      toast.error("❌ Email not found. Please restart password reset.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/reset-password`,
        {
          email: resetEmail,
          newPassword: newPassword,
        }
      );

      toast.success(`🔑 ${res.data.message}`);

      localStorage.removeItem("otp");
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center fw-bold text-primary">
          Style Vault
        </h2>

        <p className="text-center text-muted">
          Reset Your Password
        </p>

        {/* New Password */}

        <div className="mb-3">
          <label>New Password</label>

          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
              type={showConfirm ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;