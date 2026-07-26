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

router.get("/recommend/:userId", async (req, res) => {
  try {
    const clothes = await Clothes.find({
      userId: req.params.userId,
    });

    const dresses = clothes.filter(item => item.category === "Dress");
    const tops = clothes.filter(item => item.category === "Top");
    const bottoms = clothes.filter(item => item.category === "Bottom");
    const shoesList = clothes.filter(item => item.category === "Shoes");
    const accessories = clothes.filter(item => item.category === "Accessories");

    const pickRandom = (arr) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;

    let outfit = {};

    const useDress = dresses.length > 0 && Math.random() > 0.5;

    if (useDress) {
      const dress = pickRandom(dresses);
      outfit.dress = dress;
      outfit.top = null;
      outfit.bottom = null;

      const matchingShoes = shoesList.filter(s => s.occasion === dress.occasion);
      outfit.shoes = pickRandom(matchingShoes.length ? matchingShoes : shoesList);

      const matchingAccessory = accessories.filter(a => a.occasion === dress.occasion);
      outfit.accessory = pickRandom(matchingAccessory.length ? matchingAccessory : accessories);

    } else {
      const top = pickRandom(tops);
      outfit.top = top;
      outfit.dress = null;

      if (top) {
        const matchingBottoms = bottoms.filter(b => b.occasion === top.occasion);
        outfit.bottom = pickRandom(matchingBottoms.length ? matchingBottoms : bottoms);
      } else {
        outfit.bottom = pickRandom(bottoms);
      }

      const referenceOccasion = top?.occasion || outfit.bottom?.occasion;
      const matchingShoes = shoesList.filter(s => s.occasion === referenceOccasion);
      outfit.shoes = pickRandom(matchingShoes.length ? matchingShoes : shoesList);

      const matchingAccessory = accessories.filter(a => a.occasion === referenceOccasion);
      outfit.accessory = pickRandom(matchingAccessory.length ? matchingAccessory : accessories);
    }

    res.json(outfit);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
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

module.exports = router;