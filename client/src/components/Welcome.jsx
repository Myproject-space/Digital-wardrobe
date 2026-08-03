import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import ThemeButton from "./ThemeButton.jsx";
import "./welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);


  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div
  className={`welcome-page ${darkMode ? "dark" : ""}`}
 
>

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

  <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
  
    <a 
    href="#features"
    className={active === "features" ? "active" : ""}
    onClick={() => setMenuOpen(false)}
  >
    Features
  </a>

  
    <a href="#about"
    className={active === "about" ? "active" : ""}
    onClick={() => setMenuOpen(false)}
  >
    About
  </a>

  
    <a href="#services"
    className={active === "services" ? "active" : ""}
    onClick={() => setMenuOpen(false)}
  >
    Services
  </a>

  
    <a href="#contact"
    className={active === "contact" ? "active" : ""}
    onClick={() => setMenuOpen(false)}
  >
    Contact
  </a>
</nav>


<div className="nav-controls">
    <ThemeButton darkMode={darkMode} setDarkMode={setDarkMode} />
<div
  className="menu-icon"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? "✕" : "☰"}
</div>


</div>
</header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="left">
            <h1>
              Welcome To
              <br />
              <span>Style Vault</span>
            </h1>
          

            <button
  className="start-btn"
  onClick={() => navigate("/login")}
>
  Get Started →
</button>
          </div>

<p className="hero-copyright">
  © 2026 StyleVault. All Rights Reserved.
</p>

        </section>
      </div>

      {/* Features */}
<section id="features" className="section">
  <h2>Features</h2>

  <p>
    Everything you need to take control of your wardrobe —
    organized, accessible, and effortless.
  </p>

  <div className="feature-grid">
    <div className="feature-item">
      <span className="feature-icon">👕</span>
      <h4>Digital Closet</h4>
      <p>Upload and catalog every piece of clothing you own, all in one place.</p>
    </div>

    <div className="feature-item">
      <span className="feature-icon">✨</span>
      <h4>Smart Outfit Suggestions</h4>
      <p>Get personalized outfit combinations based on what's already in your closet.</p>
    </div>

    <div className="feature-item">
      <span className="feature-icon">❤️</span>
      <h4>Favorites & Quick Access</h4>
      <p>Mark your go-to pieces and outfits so they're always one tap away.</p>
    </div>

    <div className="feature-item">
      <span className="feature-icon">🔍</span>
      <h4>Search & Filter</h4>
      <p>Find exactly what you're looking for by category, color, or occasion instantly.</p>
    </div>

    <div className="feature-item">
      <span className="feature-icon">📱</span>
      <h4>Access Anywhere</h4>
      <p>Your wardrobe travels with you — check it from your phone, tablet, or laptop.</p>
    </div>

    <div className="feature-item">
      <span className="feature-icon">🌗</span>
      <h4>Light & Dark Mode</h4>
      <p>Switch between themes for a comfortable experience, day or night.</p>
    </div>
  </div>
</section>

{/* About */}
<section id="about" className="section">
  <h2>About</h2>

  <p>
    Style Vault was built for anyone who's ever stood in front of
    a full closet and still felt like they had nothing to wear.
    We believe getting dressed should be simple, fast, and even
    a little fun.
  </p>

  <p>
    Our mission is to bring the same organization you'd expect
    from a professional stylist's closet to everyone — digitally,
    for free, and without the clutter. Whether you're planning
    outfits for the week or just trying to remember what you
    own, Style Vault keeps your wardrobe visible and easy to use.
  </p>

  <div className="about-stats">
    <div className="stat-box">
      <h3>100%</h3>
      <p>Digital & Organized</p>
    </div>

    <div className="stat-box">
      <h3>24/7</h3>
      <p>Access to Your Closet</p>
    </div>

    <div className="stat-box">
      <h3>0</h3>
      <p>Clutter, All Clarity</p>
    </div>
  </div>
</section>

{/* Services */}
<section id="services" className="section">
  <h2>Services</h2>

  <p>
    From organizing to styling, here's how Style Vault helps you
    every day.
  </p>

  <div className="service-container">
    <div className="service-card">
      <h3>Digital Wardrobe</h3>
      <p>
        Store and organize your clothes digitally, with details
        like category, color, season, and occasion for every item.
      </p>
    </div>

    <div className="service-card">
      <h3>Outfit Planner</h3>
      <p>
        Create stylish outfit combinations easily, or let our
        smart recommender do it for you based on your wardrobe.
      </p>
    </div>

    <div className="service-card">
      <h3>Favorites</h3>
      <p>
        Save your favorite outfits and pieces for quick access
        whenever you need to get dressed in a hurry.
      </p>
    </div>

    <div className="service-card">
      <h3>Smart Recommendations</h3>
      <p>
        Get outfit suggestions that match by occasion and season,
        so every look feels intentional.
      </p>
    </div>

    <div className="service-card">
      <h3>Multi-Device Access</h3>
      <p>
        Your wardrobe syncs across devices — check your closet
        from anywhere, anytime.
      </p>
    </div>

    <div className="service-card">
      <h3>Secure & Private</h3>
      <p>
        Your wardrobe data stays yours — securely stored and
        accessible only to you.
      </p>
    </div>
  </div>
</section>

{/* Contact */}
<section id="contact" className="section">
  <h2>Contact</h2>

  <p>
    Have questions, feedback, or need help with your account?
    We'd love to hear from you.
  </p>

  <div className="contact-grid">
    <div className="contact-item">
      <span className="feature-icon">📧</span>
      <h4>Email</h4>
      <p>support@stylevault.com</p>
    </div>

    <div className="contact-item">
      <span className="feature-icon">📞</span>
      <h4>Phone</h4>
      <p>+91 9876543210</p>
    </div>

    <div className="contact-item">
      <span className="feature-icon">🕐</span>
      <h4>Support Hours</h4>
      <p>Mon – Sat, 9 AM – 7 PM</p>
    </div>
  </div>


</section>

    </>
  );
}

export default Welcome;