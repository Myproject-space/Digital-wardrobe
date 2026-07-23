import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function ForgotPassword() {
    const sendOTP = () => {

  if (mobile.length !== 10) {
    toast.warning("📱 Please enter a valid 10-digit mobile number.");
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  localStorage.setItem("otp", otp);

  toast.success(`📩 Demo OTP: ${otp}`);

  navigate("/verify-otp");
};
    const [mobile, setMobile] = useState("");
const navigate = useNavigate();
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h2 className="text-center fw-bold text-primary mb-2">
          ClosetVault
        </h2>

        <p className="text-center text-muted">
          Reset Your Password
        </p>

        
        <div className="mb-3">
          <label>Mobile Number</label>

          <div className="input-group">

            <span className="input-group-text">
              <FaMobileAlt />
            </span>

            <input
  type="tel"
  className="form-control"
  placeholder="Enter Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
/>

<button
  className="btn btn-primary w-100"
  onClick={sendOTP}
>
  Send OTP
</button>


          </div>
        </div>

        
      </div>
    </div>
  );
}

export default ForgotPassword;