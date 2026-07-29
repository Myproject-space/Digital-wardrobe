import "./ThemeButton.css";

function ThemeButton({ darkMode, setDarkMode }) {
  return (
    <button
      className="theme-btn"
      onClick={() => {
        console.log("Button clicked");
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeButton;