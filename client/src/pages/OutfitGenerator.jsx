import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaShoePrints,
  FaShoppingBag,
  FaMagic,
} from "react-icons/fa";
import "./OutfitGenerator.css";

function OutfitGenerator() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [clothes, setClothes] = useState([]);

  const [selectedTop, setSelectedTop] = useState("");
  const [selectedBottom, setSelectedBottom] = useState("");
  const [selectedDress, setSelectedDress] = useState("");
  const [selectedShoes, setSelectedShoes] = useState("");
  const [selectedAccessory, setSelectedAccessory] = useState("");

  const [generatedOutfit, setGeneratedOutfit] = useState(null);

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
      console.log("Failed to fetch clothes:", error);
    }
  };

  // Categories
  const tops = clothes.filter(
    (item) => item.category === "Top"
  );

  const bottoms = clothes.filter(
    (item) => item.category === "Bottom"
  );

  const dresses = clothes.filter(
    (item) => item.category === "Dress"
  );

  const shoes = clothes.filter(
    (item) => item.category === "Shoes"
  );

  const accessories = clothes.filter(
    (item) => item.category === "Accessories"
  );

  // Generate Outfit
  const generateOutfit = () => {
    const top = clothes.find(
      (item) => item._id === selectedTop
    );

    const bottom = clothes.find(
      (item) => item._id === selectedBottom
    );

    const dress = clothes.find(
      (item) => item._id === selectedDress
    );

    const shoe = clothes.find(
      (item) => item._id === selectedShoes
    );

    const accessory = clothes.find(
      (item) => item._id === selectedAccessory
    );

    // Dress outfit
    if (selectedDress) {
      setGeneratedOutfit({
        dress,
        top: null,
        bottom: null,
        shoes: shoe,
        accessory,
      });

      return;
    }

    // Top + Bottom outfit
    setGeneratedOutfit({
      dress: null,
      top,
      bottom,
      shoes: shoe,
      accessory,
    });
  };

  return (
    <div className="outfit-generator-page">

      <div className="outfit-generator-container">

        {/* BACK BUTTON */}

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="outfit-header">

          <h1>
            Outfit Generator <FaMagic />
          </h1>

          <p>
            Create your own outfit by selecting clothes
            from your wardrobe.
          </p>

        </div>

        {/* SELECTION CARD */}

        <div className="selection-card">

          {/* TOP */}

          <div className="selection-box">

            <div className="selection-title">

              <FaTshirt />

              <span>Top</span>

            </div>

            <select
              value={selectedTop}
              onChange={(e) => {
                setSelectedTop(e.target.value);

                // Agar Top select kiya,
                // Dress remove ho jayegi
                setSelectedDress("");
              }}
              disabled={!!selectedDress}
            >

              <option value="">
                Select a Top
              </option>

              {tops.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* BOTTOM */}

          <div className="selection-box">

            <div className="selection-title">

              👖

              <span>Bottom</span>

            </div>

            <select
              value={selectedBottom}
              onChange={(e) => {
                setSelectedBottom(e.target.value);

                setSelectedDress("");
              }}
              disabled={!!selectedDress}
            >

              <option value="">
                Select a Bottom
              </option>

              {bottoms.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* DRESS */}

          <div className="selection-box">

            <div className="selection-title">

              👗

              <span>Dress</span>

            </div>

            <select
              value={selectedDress}
              onChange={(e) => {

                setSelectedDress(e.target.value);

                // Dress select hone par
                // Top & Bottom remove
                setSelectedTop("");
                setSelectedBottom("");

              }}
              disabled={
                !!selectedTop ||
                !!selectedBottom
              }
            >

              <option value="">
                Select a Dress
              </option>

              {dresses.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* SHOES */}

          <div className="selection-box">

            <div className="selection-title">

              <FaShoePrints />

              <span>Shoes</span>

            </div>

            <select
              value={selectedShoes}
              onChange={(e) =>
                setSelectedShoes(e.target.value)
              }
            >

              <option value="">
                Select Shoes
              </option>

              {shoes.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* ACCESSORIES */}

          <div className="selection-box">

            <div className="selection-title">

              <FaShoppingBag />

              <span>Accessories</span>

            </div>

            <select
              value={selectedAccessory}
              onChange={(e) =>
                setSelectedAccessory(e.target.value)
              }
            >

              <option value="">
                Select Accessories
              </option>

              {accessories.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* GENERATE BUTTON */}

          <button
            className="generate-outfit-btn"
            onClick={generateOutfit}
            disabled={
              !selectedShoes ||
              (!selectedDress &&
                (!selectedTop || !selectedBottom))
            }
          >

            <FaMagic />

            Generate Outfit

          </button>

        </div>

        {/* GENERATED OUTFIT */}

        {generatedOutfit && (

          <div className="generated-section">

            <h2>
              ✨ Your Outfit
            </h2>

            <div className="generated-outfit-card">

              {/* DRESS */}

              {generatedOutfit.dress && (

                <div className="outfit-item">

                  <img
                    src={generatedOutfit.dress.image}
                    alt={generatedOutfit.dress.name}
                  />

                  <h4>
                    {generatedOutfit.dress.name}
                  </h4>

                  <span>
                    Dress
                  </span>

                </div>

              )}

              {/* TOP */}

              {generatedOutfit.top && (

                <div className="outfit-item">

                  <img
                    src={generatedOutfit.top.image}
                    alt={generatedOutfit.top.name}
                  />

                  <h4>
                    {generatedOutfit.top.name}
                  </h4>

                  <span>
                    Top
                  </span>

                </div>

              )}

              {/* BOTTOM */}

              {generatedOutfit.bottom && (

                <div className="outfit-item">

                  <img
                    src={generatedOutfit.bottom.image}
                    alt={generatedOutfit.bottom.name}
                  />

                  <h4>
                    {generatedOutfit.bottom.name}
                  </h4>

                  <span>
                    Bottom
                  </span>

                </div>

              )}

              {/* SHOES */}

              {generatedOutfit.shoes && (

                <div className="outfit-item">

                  <img
                    src={generatedOutfit.shoes.image}
                    alt={generatedOutfit.shoes.name}
                  />

                  <h4>
                    {generatedOutfit.shoes.name}
                  </h4>

                  <span>
                    Shoes
                  </span>

                </div>

              )}

              {/* ACCESSORY */}

              {generatedOutfit.accessory && (

                <div className="outfit-item">

                  <img
                    src={generatedOutfit.accessory.image}
                    alt={generatedOutfit.accessory.name}
                  />

                  <h4>
                    {generatedOutfit.accessory.name}
                  </h4>

                  <span>
                    Accessory
                  </span>

                </div>

              )}

            </div>

            {/* SAVE BUTTON */}

            <button className="save-outfit-btn">
              ❤️ Save Outfit
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default OutfitGenerator;