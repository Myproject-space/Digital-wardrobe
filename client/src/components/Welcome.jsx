import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
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

        {/* Features Section */}
<section id="features" className="section">
  <h2>Features</h2>
  <p>Manage your wardrobe digitally, create outfits, and organize your fashion effortlessly.</p>
</section>

{/* About Section */}
<section id="about" className="section">
  <h2>About</h2>
  <p>
    Style Vault is a smart digital wardrobe that helps you organize clothes,
    save outfits, and manage your fashion collection in one place.
  </p>
</section>

{/* Services Section */}
<section id="services" className="section">
  <h2>Services</h2>
  <div className="service-container">
    <div className="service-card">
      <h3>Digital Wardrobe</h3>
      <p>Store and organize your clothes digitally.</p>
    </div>

    <div className="service-card">
      <h3>Outfit Planner</h3>
      <p>Create stylish outfit combinations easily.</p>
    </div>

    <div className="service-card">
      <h3>Favorites</h3>
      <p>Save your favorite outfits for quick access.</p>
    </div>
  </div>
</section>

{/* Contact Section */}
<section id="contact" className="section">
  <h2>Contact</h2>

  <p>Email: support@stylevault.com</p>
  <p>Phone: +91 9876543210</p>
</section>

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
            src={logo}
            alt="Style Vault"
            className="hero-image"
          />

        </div>

      </section>

    </div>
  );
}

export default Welcome;