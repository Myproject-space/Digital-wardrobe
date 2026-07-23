import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useRef } from "react";

function OtpVerification() {
  const navigate = useNavigate();
      const inputRefs = useRef([]);
      const [otp, setOtp] = useState(["", "", "", "", "", ""]);
      
      const handleChange = (e, index) => {
  const value = e.target.value;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value.length === 1 && index < 5) {
    inputRefs.current[index + 1].focus();
  }
};
      
const handleKeyDown = (e, index) => {
  if (
    e.key === "Backspace" &&
    e.target.value === "" &&
    index > 0
  ) {
    inputRefs.current[index - 1].focus();
  }
};
const verifyOTP = () => {
  const enteredOTP = otp.join("");
  const savedOTP = localStorage.getItem("otp");

  if (enteredOTP === savedOTP) {
    toast.success("✅ OTP Verified Successfully");
    navigate("/reset-password");
  } else {
    toast.error("❌ Invalid OTP");
  }
};

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h2 className="text-center fw-bold text-primary">
          ClosetVault
        </h2>

        <p className="text-center text-muted">
          Enter the OTP sent to your mobile number
        </p>

        <div className="d-flex justify-content-between mb-3">

          <input
  ref={(el) => {
    inputRefs.current[0] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 0)}
  onKeyDown={(e) => handleKeyDown(e, 0)}
/>

          <input
  ref={(el) => {
    inputRefs.current[1] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 1)}
  onKeyDown={(e) => handleKeyDown(e, 1)}
/>

         <input
  ref={(el) => {
    inputRefs.current[2] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 2)}
  onKeyDown={(e) => handleKeyDown(e, 2)}
/>

          <input
  ref={(el) => {
    inputRefs.current[3] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 3)}
  onKeyDown={(e) => handleKeyDown(e, 3)}
/>

          <input
  ref={(el) => {
    inputRefs.current[4] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 4)}
  onKeyDown={(e) => handleKeyDown(e, 4)}
/>

          <input
  ref={(el) => {
    inputRefs.current[5] = el;
  }}
  type="text"
  className="form-control text-center"
  maxLength={1}
  style={{
    width: "50px",
    height: "50px",
    fontSize: "24px",
  }}
  onChange={(e) => handleChange(e, 5)}
  onKeyDown={(e) => handleKeyDown(e, 5)}
/>

        </div>

        


<button
  className="btn btn-primary w-100"
  onClick={verifyOTP}
>
  Verify OTP
</button>

        <p className="text-center mt-3">
          Didn't receive OTP?
          <Link to="/forgot-password"> Resend OTP</Link>
        </p>

      </div>
    </div>
  );
}

export default OtpVerification;