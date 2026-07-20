import hero from "../assets/hero.png";

function Logo() {
  return (
    <div className="text-center mb-3">
      <img
        src={hero}
        alt="Style Vault Logo"
        style={{
          width: "180px",
          height: "180px",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default Logo;