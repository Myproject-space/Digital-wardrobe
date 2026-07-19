import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-circle-top" />
      <div className="welcome-circle-bottom" />

      <div className="welcome-center-content">
        {/* Logo */}
        <div className="welcome-logo-wrapper">
          <Logo size={170} />
        </div>

        {/* Heading */}
        <h1 className="welcome-heading-line1">
  Welcome to
</h1>

<h1 className="welcome-heading-line2">
  Your Closet <span>👜</span>
</h1>

        {/* Subtitle */}
        <p className="welcome-subtitle">
          Dress With Confidence
        </p>

        {/* Button */}
        <button
          className="welcome-btn"
          onClick={() => navigate("/login")}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Welcome;