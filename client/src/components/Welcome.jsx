import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import ThemeButton from "./ThemeButton";
import "./welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);


  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const handleScroll = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("welcome-dark");
  } else {
    document.body.classList.remove("welcome-dark");
  }

  return () => document.body.classList.remove("welcome-dark");
}, [darkMode]);

  return (
    <>
      <div className={`welcome-page ${darkMode ? "dark" : ""}`}>

        {/* Background Blur */}
        <div className="bg-circle circle1"></div>
        <div className="bg-circle circle2"></div>

        {/* Navbar */}

        <header className="navbar">

  <div className="brand">
    <img
      src={logo}
      alt="logo"
      className="nav-logo"
    />

    <div className="brand-text">
      <h2>Style</h2>
      <h2>Vault</h2>
    </div>
  </div>

  <nav className="nav-links">
    <a
      href="#features"
      className={active === "features" ? "active" : ""}
    >
      Features
    </a>

    <a
      href="#about"
      className={active === "about" ? "active" : ""}
    >
      About
    </a>

    <a
      href="#services"
      className={active === "services" ? "active" : ""}
    >
      Services
    </a>

    <a
      href="#contact"
      className={active === "contact" ? "active" : ""}
    >
      Contact
    </a>
  </nav>

  <ThemeButton
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />

</header>

        {/* Hero Section */}
        <section className="hero-section">
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

        </section>
      </div>

      {/* Features */}
      <section id="features" className="section">
        <h2>Features</h2>

        <p>
          Manage your wardrobe digitally, create outfits,
          organize your clothes, and save your favorite looks
          effortlessly.
        </p>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2>About</h2>

        <p>
          Style Vault is a smart digital wardrobe application
          that helps users organize clothes, create outfit
          combinations, and manage fashion collections in one
          place.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="section">
        <h2>Services</h2>

        <div className="service-container">
          <div className="service-card">
            <h3>Digital Wardrobe</h3>

            <p>
              Store and organize your clothes digitally.
            </p>
          </div>

          <div className="service-card">
            <h3>Outfit Planner</h3>

            <p>
              Create stylish outfit combinations easily.
            </p>
          </div>

          <div className="service-card">
            <h3>Favorites</h3>

            <p>
              Save your favorite outfits for quick access.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <h2>Contact</h2>

        <p>Email: support@stylevault.com</p>

        <p>Phone: +91 9876543210</p>
      </section>
    </>
  );
}

export default Welcome;