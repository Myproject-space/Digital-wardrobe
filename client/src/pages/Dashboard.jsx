import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import axios from "axios";
import ThemeButton from "../components/ThemeButton";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTshirt,
  FaHeart,
  FaShoppingBag,
  FaPlus,
} from "react-icons/fa";

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const hour = new Date().getHours();
  const navigate = useNavigate();

  const [clothes, setClothes] = useState([]);
  const [outfit, setOutfit] = useState(null);
  const [loadingOutfit, setLoadingOutfit] = useState(false);
  const [darkMode, setDarkMode] = useState(false);



  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${API_URL}/api/clothes/${userId}`
      );

      setClothes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

 const recommendOutfit = async () => {

  // Agar outfit already visible hai to hide kar do
  if (outfit) {
    setOutfit(null);
    return;
  }

  setLoadingOutfit(true);

  try {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `${API_URL}/api/clothes/recommend/${userId}`
    );

    setOutfit(res.data);

  } catch (error) {
    console.log(error);
    toast.error("Failed to Generate Outfit");
  } finally {
    setLoadingOutfit(false);
  }
};

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  }
 
 return (
  <div
    className={`container-fluid py-4 wardrobe-page ${darkMode ? "dark" : ""}`}
    style={{
      minHeight: "100vh",
      background: darkMode
        ? "linear-gradient(135deg,#111827,#1F2937,#374151)"
        : "linear-gradient(135deg,#F8F5FF 0%,#EDE9FE 50%,#D8B4FE 100%)",
      position: "relative",
    }}
  >
    <ThemeButton
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <Logo />

    <div className="card p-4 shadow-lg mt-5">
      <h3 className="fw-bold">{greeting}</h3>

      <h5 className="mt-2">
        Hello, {userName} 👋
      </h5>

      <p className="text-muted mb-4">
        Your Fashion, Organized.
      </p>

      <div className="row">
        <StatCard
          icon={<FaTshirt color="#6366F1" />}
          title="Total Clothes"
          count={clothes.length}
        />

        <StatCard
          icon={<FaHeart color="#EC4899" />}
          title="Favorites"
          count={clothes.filter((item) => item.favorite).length}
        />

        <StatCard
          icon={<FaShoppingBag color="#8B5CF6" />}
          title="Outfits"
          count="0"
        />

        <StatCard
          icon="🧺"
          title="Laundry"
          count="0"
        />
      </div>

      <hr />

      <button
  className="btn btn-success mt-3"
  style={{ backgroundColor: "#3B82F6" }}
  onClick={recommendOutfit}
  disabled={loadingOutfit}
>
  {loadingOutfit
    ? "Generating..."
    : outfit
      ? "❌ Hide Outfit"
      : "✨ Generate Smart Outfit"}
</button>

      {outfit && (
        <div
          className="card mt-3 mb-3 p-3 shadow"
          style={{
            background: "#ECFDF5",
            border: "2px solid #6EE7B7",
            borderRadius: "15px",
          }}
        >
          <h4
            style={{
              color: "#2563EB",
              fontWeight: "700",
            }}
          >
            ✨ Today's Smart Outfit
          </h4>

          {outfit.top && outfit.bottom && outfit.shoes ? (
  <div className="alert alert-success mt-3">
    ✅ Complete outfit generated successfully!
  </div>
) : (
  <div className="alert alert-warning mt-3">
    ⚠️ Add more clothes to get a complete outfit.
  </div>
)}

         <div className="row mt-3">

  {[
    { title: "Top", item: outfit.top, icon: "👕" },
    { title: "Bottom", item: outfit.bottom, icon: "👖" },
    { title: "Shoes", item: outfit.shoes, icon: "👟" },
  ].map(({ title, item, icon }) => (
    <div className="col-md-4 mb-3" key={title}>

      <div className="recommend-card">

        {item ? (
          <>
            <img
              src={item.image}
              alt={item.name}
              className="recommend-img"
            />

            <h5 className="mt-3">
              {icon} {title}
            </h5>

            <p>{item.name}</p>
            <p className="text-muted mb-1">
  🎨 {item.color}
</p>

<p className="text-muted">
  ☀ {item.season}
</p>
          </>
        ) : (
          <>
            <div className="recommend-placeholder">
              {icon}
            </div>

            <h5 className="mt-3">{title}</h5>

            <p className="text-muted">
  Not Available
</p>
          </>
        )}

      </div>
    </div>
  ))}

</div>

        </div>
      )}

      <button
        className="btn btn-outline-primary"
        onClick={() => navigate("/wardrobe")}
      >
        👕 My Wardrobe
      </button>

      <h5 className="mb-3 mt-4">
        ⚡ Quick Actions
      </h5>

      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-clothes")}
        >
          <FaPlus /> Add Clothes
        </button>
      </div>
    </div>
  </div>
);
}

export default Dashboard;