import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaHeart,
  FaShoppingBag,
  FaPlus,
  FaSearch,
  FaUser,
} from "react-icons/fa";

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const hour = new Date().getHours();
  const navigate = useNavigate();

  const [clothes, setClothes] = useState([]);
  const [outfit, setOutfit] = useState(null);

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
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${API_URL}/api/clothes/recommend/${userId}`
      );

      setOutfit(res.data);
    } catch (error) {
      console.log(error);
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
  className="container-fluid py-4"
 style={{
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F8F5FF 0%, #EDE9FE 50%, #D8B4FE 100%)",
}}
>
      {/* Logo */}
      <Logo />

      {/* Greeting Card */}
      <div className="card p-4 shadow-lg mt-2">

        <h3 className="fw-bold">{greeting}</h3>

        <h5 className="mt-2">
         Hello, {userName} 👋
        </h5>

        <p className="text-muted mb-4">
          Your Fashion, Organized.
        </p>

        {/* Statistics */}
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

        {/* Quick Actions */}

        <button
  className="btn btn-success mt-3"
  style={{ backgroundColor: "#3B82F6" }}
  onClick={recommendOutfit}
>
  ✨ Recommend Outfit
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
      ✨ Recommended Outfit
    </h4>

    <p>
      👕 <strong>Top:</strong>{" "}
      {outfit.top ? outfit.top.name : "Not Available"}
    </p>

    <p>
      👖 <strong>Bottom:</strong>{" "}
      {outfit.bottom ? outfit.bottom.name : "Not Available"}
    </p>

    <p>
      👟 <strong>Shoes:</strong>{" "}
      {outfit.shoes ? outfit.shoes.name : "Not Available"}
    </p>
  </div>
)}

        <button
  className="btn btn-outline-primary"
  onClick={() => navigate("/wardrobe")}
>
  👕 My Wardrobe
</button>

        <h5 className="mb-3">
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