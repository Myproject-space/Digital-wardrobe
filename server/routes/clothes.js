const express = require("express");
const router = express.Router();


const Clothes = require("../models/Clothes");
const upload = require("../middleware/upload");

console.log("✅ Clothes Routes Loaded");

// Add Clothes API
router.post("/add", upload.single("image"), async (req, res) => {
    try {

      console.log(req.file);
console.log(req.body);

    const {
  name,
  category,
  color,
  size,
 brand,
  season,
  occasion,
  favorite,
  userId,
} = req.body;

const image = req.file
  ? req.file.path
  : "";

   const newCloth = new Clothes({
  name,
  category,
  color,
  size,
  brand,
  season,
  occasion,
  image,
  favorite,
  userId,
});

    await newCloth.save();

    res.status(201).json({
      message: "Cloth Added Successfully",
      cloth: newCloth,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Clothes API
router.get("/test", (req, res) => {
  res.send("Clothes Route Working");
});

router.get("/:userId", async (req, res) => {
  try {
    const clothes = await Clothes.find({
      userId: req.params.userId,
    });

    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Clothes API
router.delete("/:id", async (req, res) => {
  try {
    await Clothes.findByIdAndDelete(req.params.id);

    res.json({
      message: "Cloth Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Clothes API
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

   const updatedData = {
  name: req.body.name,
  category: req.body.category,
  color: req.body.color,
  size: req.body.size,
  brand: req.body.brand,
  season: req.body.season,
  occasion: req.body.occasion,
};

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const cloth = await Clothes.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Cloth Updated Successfully",
      cloth,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Toggle Favorite
router.put("/favorite/:id", async (req, res) => {
  try {
    const cloth = await Clothes.findById(req.params.id);

    if (!cloth) {
      return res.status(404).json({
        message: "Cloth not found",
      });
    }

    cloth.favorite = !cloth.favorite;

    await cloth.save();

    res.json({
      message: "Favorite Updated",
      cloth,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Recommend Outfit
router.get("/recommend/:userId", async (req, res) => {
  try {
    const clothes = await Clothes.find({
      userId: req.params.userId,
    });

    const top = clothes.find(item => item.category === "Top");
    const bottom = clothes.find(item => item.category === "Bottom");
    const shoes = clothes.find(item => item.category === "Shoes");

    res.json({
      top,
      bottom,
      shoes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;