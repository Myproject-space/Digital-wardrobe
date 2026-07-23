import { useState, useEffect } from "react";
import axios from "axios";
import "./Wardrobe.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import tshirt from "../assets/tshirt.jpeg";
import jeans from "../assets/jeans.jpeg";
import shoes from "../assets/shoes.jpeg";
import dress from "../assets/dress.jpeg";
import handbag from "../assets/bag.jpeg";

function Wardrobe() {

const API_URL = import.meta.env.VITE_API_URL;

  const [clothes, setClothes] = useState([]);

  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [favorites, setFavorites] = useState([]);
const navigate = useNavigate();

const filteredClothes = clothes.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || item.category === category;

  return matchesSearch && matchesCategory;
});

useEffect(() => {
  fetchClothes();
}, []);

const fetchClothes = async () => {
  try {
const userId = localStorage.getItem("userId");

const res = await axios.get(
  `${API_URL}/api/clothes/${userId}`
);
    console.log(res.data);

    setClothes(res.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteCloth = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this clothing?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${API_URL}/api/clothes/${id}`
    );

   toast.success("🗑️ Cloth Deleted Successfully");

    fetchClothes();

  } catch (error) {
    console.log(error);
   toast.error("Delete Failed");
  }
};

const toggleFavorite = async (id) => {
  try {
    await axios.put(
      `${API_URL}/api/clothes/favorite/${id}`
    );

    fetchClothes();

    const cloth = clothes.find((c) => c._id === id);

toast.success(
  cloth.favorite
    ? "💔 Removed from Favorites"
    : "❤️ Added to Favorites"
);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="wardrobe-page">
      <div className="container py-5">

        <h2 className="text-center fw-bold mb-4">
          👕 My Wardrobe
        </h2>

        <div className="row mb-4">

  <div className="col-md-6 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="🔍 Search Clothes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="col-md-6 mb-2">
    <select
      className="form-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option>All</option>
      <option>Top</option>
      <option>Bottom</option>
      <option>Dress</option>
      <option>Shoes</option>
      <option>Accessories</option>
    </select>
  </div>

</div>

        <div className="row">
          {filteredClothes.map((item) => (
            <div className="col-md-4 mb-4"key={item._id}>

              <div className="wardrobe-card shadow h-100">

<div className="image-container">

  <img
    src={item.image ? item.image : tshirt}
    
    alt={item.name}
    className="wardrobe-img"
  />
 

  <button
    className="favorite-btn"
    onClick={() => toggleFavorite(item._id)}
  >
   {item.favorite ? (
  <FaHeart color="red" size={22} />
) : (
  <FaRegHeart color="gray" size={22} />
)}
  </button>

</div>
                <div className="card-body">

                  <h4>{item.name}</h4>

                  <div className="cloth-details">

  <span className="cloth-badge category-badge">
    🏷 {item.category}
  </span>

  <span className="cloth-badge color-badge">
    🎨 {item.color}
  </span>

</div>

                  <div className="d-flex gap-2 mt-3">

                    <button
  className="btn btn-warning flex-fill"
  onClick={() => navigate("/add-clothes", { state: item })}
>
  ✏️ Edit
</button>

                    <button
  className="btn btn-danger flex-fill"
  onClick={() => deleteCloth(item._id)}
>
  🗑 Delete
</button>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Wardrobe;