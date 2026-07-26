const express = require("express");
const router = express.Router();

const Outfit = require("../models/Outfit");

// Save Outfit
router.post("/save", async (req, res) => {
  try {
    const outfit = new Outfit(req.body);

    await outfit.save();

    res.status(201).json({
      message: "Outfit Saved Successfully",
      outfit,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Get Saved Outfits
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
      // Dress-based outfit: pick a dress, then match shoes/accessory by occasion
      const dress = pickRandom(dresses);
      outfit.dress = dress;
      outfit.top = null;
      outfit.bottom = null;

      const matchingShoes = shoesList.filter(s => s.occasion === dress.occasion);
      outfit.shoes = pickRandom(matchingShoes.length ? matchingShoes : shoesList);

      const matchingAccessory = accessories.filter(a => a.occasion === dress.occasion);
      outfit.accessory = pickRandom(matchingAccessory.length ? matchingAccessory : accessories);

    } else {
      // Top + Bottom outfit: match by occasion
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

module.exports = router;