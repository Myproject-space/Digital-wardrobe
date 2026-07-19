import logo from "../assets/logo.png";

function Logo({ size = 170 }) {
  return (
    <div className="text-center mb-2">
      <img
        src={logo}
        alt="ClosetVault Logo"
        style={{
          width: `${size}px`,
          height: "auto",        // ✅ ye zaroori hai, "170px" fixed nahi hona chahiye
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default Logo;