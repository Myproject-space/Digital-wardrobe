import logo from "../assets/logo.png";

function Logo({ size = 170 }) {
  return (
    <img
      src={logo}
      alt="ClosetVault Logo"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "contain",
      }}
    />
  );
}

export default Logo;