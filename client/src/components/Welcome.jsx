import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";
import "./welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      {/* Background Blur */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>

      {/* Navbar */}
     <header className="navbar">

  <div className="brand">
    <h2>
      Style
      <br />
      <span>Vault</span>
    </h2>
  </div>

  <nav className="nav-links">
    <a href="#features">Features</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>

</header>

      {/* Hero Section */}
      <section className="hero-section">

        {/* Left Content */}
        <div className="left">

        

          <h1>
            Welcome To
            <br />
            <span>Style Vault</span>
          </h1>

          <h3 className="tagline">
            Your Smart Digital Wardrobe
          </h3>

          <p className="description">
            Organize your wardrobe, create stylish outfits,
            and manage your fashion effortlessly.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </button>

        </div>

        {/* Right Image */}
        <div className="right">

          <img
            src={hero}
            alt="Style Vault"
            className="hero-image"
          />

        </div>

      </section>

    </div>
  );
}

export default Welcome;