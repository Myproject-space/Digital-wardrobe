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
router.get("/:userId", async (req, res) => {
  try {
    const outfits = await Outfit.find({
      userId: req.params.userId,
    })
      .populate("top")
      .populate("bottom")
      .populate("shoes");

    res.json(outfits);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;