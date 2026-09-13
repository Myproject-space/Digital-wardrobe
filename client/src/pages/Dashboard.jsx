import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import axios from "axios";
import ThemeButton from "../components/ThemeButton";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import dashboardBg from "../assets/Dashboard.png";
import { toast } from "react-toastify";

import {
  FaTshirt,
  FaHeart,
  FaShoppingBag,
  FaPlus,
} from "react-icons/fa";

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const hour = new Date().getHours();

  const userName = localStorage.getItem("userName");

  const [clothes, setClothes] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [laundryCount, setLaundryCount] = useState(0);

  const [darkMode, setDarkMode] = useState(false);

  // -----------------------------
  // Fetch Data
  // -----------------------------

  useEffect(() => {
    fetchClothes();
    fetchSavedOutfits();
  }, []);

  // -----------------------------
  // Fetch Clothes
  // -----------------------------

  const fetchClothes = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${API_URL}/api/clothes/${userId}`
      );

      setClothes(res.data);

const laundryItems = res.data.filter(
  (item) => item.laundry === true
);

setLaundryCount(laundryItems.length);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load clothes");
    }
  };

  // -----------------------------
  // Fetch Saved Outfits
  // -----------------------------

  const fetchSavedOutfits = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${API_URL}/api/outfit/${userId}`
      );

      setSavedOutfits(res.data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load saved outfits");
    }
  };

  // -----------------------------
  // Greeting
  // -----------------------------

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  }

  return (
    <div
      className={`container-fluid py-4 wardrobe-page ${
        darkMode ? "dark" : ""
      }`}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Theme Button */}

      <ThemeButton
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Logo */}

      <Logo />

     <button
  onClick={() => navigate("/login")}
  style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 1000,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }}
>
  🚪 Logout
</button>


      {/* Main Dashboard Card */}

      <div className="card shadow-lg p-4 mt-5">

        {/* Greeting */}

        <h3 className="fw-bold">
          {greeting}
        </h3>

        <h5 className="mt-2">
          Hello, {userName} 👋
        </h5>

        <p className="text-muted">
          Your Fashion, Organized.
        </p>


        {/* =========================
            STAT CARDS
        ========================= */}

        <div className="row">

          {/* Total Clothes */}

          <StatCard
            icon={<FaTshirt color="#6366F1" />}
            title="Total Clothes"
            count={clothes.length}
          />


          {/* Favorites */}

          <StatCard
            icon={<FaHeart color="#EC4899" />}
            title="Favorites"
            count={
              clothes.filter(
                (item) => item.favorite
              ).length
            }
          />


          {/* Outfits */}

          <StatCard
            icon={
              <FaShoppingBag color="#8B5CF6" />
            }
            title="Outfits"
            count={savedOutfits.length}
          />


          {/* Laundry */}

        <StatCard
  icon="🧺"
  title="Laundry"
  count={laundryCount}
  onClick={() => navigate("/laundry")}
/>

        </div>


        <hr />


        {/* =========================
            GENERATE OUTFIT
        ========================= */}

        <button
          className="btn btn-success"
          style={{
            background: "#3B82F6",
            border: "none",
          }}
          onClick={() =>
            navigate("/outfit-generator")
          }
        >
          ✨ Generate Your Outfit
        </button>


        {/* =========================
            MY WARDROBE
        ========================= */}

        <button
          className="btn btn-outline-primary mt-3"
          onClick={() =>
            navigate("/wardrobe")
          }
        >
          👕 My Wardrobe
        </button>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <h5 className="mt-4 mb-3">
          ⚡ Quick Actions
        </h5>

        <div className="d-grid gap-2">

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/add-clothes")
            }
          >
            <FaPlus /> Add Clothes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;