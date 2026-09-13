import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Laundry() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [laundryClothes, setLaundryClothes] = useState([]);

  useEffect(() => {
    fetchLaundry();
  }, []);

  const fetchLaundry = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `${API_URL}/api/clothes/${userId}`
      );

      const items = res.data.filter(
        (item) => item.laundry === true
      );

      setLaundryClothes(items);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load laundry");
    }
  };

  const markAsClean = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/clothes/laundry/${id}`
      );

      toast.success("✨ Cloth Marked as Clean");

      fetchLaundry();

    } catch (error) {
      console.log(error);
      toast.error("Failed to update laundry");
    }
  };

  return (
    <div className="container py-5">

      <button
        className="btn btn-outline-dark mb-4"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-center fw-bold mb-4">
        🧺 Laundry
      </h2>

      {laundryClothes.length === 0 ? (
        <div className="text-center mt-5">
          <h4>✨ No Clothes in Laundry</h4>
          <p className="text-muted">
            Your laundry is all clear!
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/wardrobe")}
          >
            👕 Go to Wardrobe
          </button>
        </div>
      ) : (
        <div className="row">

          {laundryClothes.map((item) => (
            <div
              className="col-md-4 mb-4"
              key={item._id}
            >
              <div className="card shadow h-100">

                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    padding: "15px",
                  }}
                />

                <div className="card-body">

                  <h4 className="fw-bold">
                    {item.name}
                  </h4>

                  <p className="mb-2">
                    🏷️ {item.category}
                  </p>

                  <p className="mb-3">
                    🎨 {item.color}
                  </p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() =>
                      markAsClean(item._id)
                    }
                  >
                    ✨ Mark as Clean
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Laundry;