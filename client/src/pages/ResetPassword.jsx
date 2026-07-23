import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (newPassword === "" || confirmPassword === "") {
      toast.warning("⚠️ Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    toast.success("🔑 Password Reset Successfully!");

setTimeout(() => {
  navigate("/");
}, 1000);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center fw-bold text-primary">
          ClosetVault
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
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;