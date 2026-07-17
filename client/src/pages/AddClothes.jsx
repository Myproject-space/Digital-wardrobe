import { useState, useEffect } from "react";
import axios from "axios";
import "./addClothes.css";
import { useNavigate, useLocation } from "react-router-dom";

function AddClothes() {

  const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

const location = useLocation();
const editData = location.state;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    season: "",
    occasion: "",
    brand: "",
    size: "",
    notes: "",
  });
  useEffect(() => {
  if (editData) {
    setFormData({
      name: editData.name || "",
      category: editData.category || "",
      color: editData.color || "",
      season: editData.season || "",
      occasion: editData.occasion || "",
      brand: editData.brand || "",
      size: editData.size || "",
      notes: editData.notes || "",
    });

   if (editData.image) {
  setPreview(`${API_URL}/uploads/${editData.image}`);
}
  }
}, [editData]);

 const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.category ||
    !formData.color ||
    !formData.season ||
    !formData.occasion
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const data = new FormData();
data.append("name", formData.name);
data.append("category", formData.category);
data.append("color", formData.color);
data.append("season", formData.season);
data.append("occasion", formData.occasion);
data.append("brand", formData.brand);
data.append("size", formData.size);
data.append("notes", formData.notes);
const userId = localStorage.getItem("userId");

     data.append("favorite", false);
     data.append("userId", userId);

    if (image) {
      data.append("image", image);
    }

    let res;

if (editData) {
 res = await axios.put(
  `${API_URL}/api/clothes/update/${editData._id}`,
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
} else {
 res = await axios.post(
  `${API_URL}/api/clothes/add`,
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
}

alert(res.data.message);

navigate("/wardrobe");

  } catch (error) {
    console.log(error);
    alert("Failed to Add Clothes");
  }
};
 const handleImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
};

 const handleReset = () => {
  setFormData({
    name: "",
    category: "",
    color: "",
    season: "",
    occasion: "",
    brand: "",
    size: "",
    notes: "",
  });

  setImage(null);
  setPreview(null);
};
  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="add-card">

    <button
  className="btn btn-outline-dark mb-4"
  onClick={() => navigate("/")}
>
  ← Back to Dashboard
</button>
    
        <h2 className="text-center fw-bold mb-4">
          👕 Add New Clothing
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Clothing Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter clothing name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Top</option>
              <option>Bottom</option>
              <option>Dress</option>
              <option>Shoes</option>
              <option>Accessories</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Color</label>

            <input
              type="text"
              className="form-control"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter color"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Season</label>

            <select
              className="form-select"
              name="season"
              value={formData.season}
              onChange={handleChange}
            >
              <option value="">Select Season</option>
              <option>Summer</option>
              <option>Winter</option>
              <option>Rainy</option>
              <option>All Season</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Occasion</label>

            <select
              className="form-select"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="">Select Occasion</option>
              <option>Casual</option>
              <option>Formal</option>
              <option>Party</option>
              <option>Traditional</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Brand</label>

            <input
              type="text"
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Size</label>

            <select
              className="form-select"
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
              <option value="">Select Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Notes</label>

            <textarea
              className="form-control"
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional Notes"
            ></textarea>
          </div>

          <div className="upload-box mb-3">
  <label className="form-label fw-bold">
    Upload Clothing Image
  </label>

  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={handleImage}
  />
</div>

{preview && (
  <div className="text-center mb-3">
    <img
      src={preview}
      alt="Preview"
      className="preview-image"
    />
  </div>
)}
          <div className="d-flex gap-3">

            <button
              type="submit"
             className="btn btn-save w-50"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline-secondary btn-reset w-50"
            >
              Reset
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddClothes;