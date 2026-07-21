import "./ThemeButton.css";

function ThemeButton({ darkMode, setDarkMode }) {
  return (
    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeButton;