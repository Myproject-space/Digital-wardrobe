import logo from "../assets/logo.png";
console.log(logo);

function Logo() {
  return (
    <div className="text-center mb-2">
      <img
  src={logo}
  alt="ClosetVault Logo"
  style={{
    width: "170px",
    height: "170px",
    objectFit: "contain",
    marginBottom: "8px",
  }}
/>
    </div>
  );
}

export default Logo;