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

    // ---- Current season auto-detect (India ke hisaab se) ----
    const month = new Date().getMonth() + 1;
    let currentSeason = "All Season";
    if ([12, 1, 2].includes(month)) currentSeason = "Winter";
    else if ([3, 4, 5, 6].includes(month)) currentSeason = "Summer";
    else if ([7, 8, 9].includes(month)) currentSeason = "Monsoon";

    // ---- Color harmony helper ----
    const neutralColors = ["black", "white", "grey", "gray", "beige", "brown", "navy", "tan", "cream"];

    const colorMatchScore = (c1, c2) => {
      if (!c1 || !c2) return 0;
      c1 = c1.toLowerCase();
      c2 = c2.toLowerCase();
      if (neutralColors.includes(c1) || neutralColors.includes(c2)) return 2;
      if (c1 === c2) return 1;
      return 0;
    };

    const seasonMatch = (item) =>
      item.season === currentSeason ||
      item.season === "All Season" ||
      item.season === "All";

    // ---- Pick best item (with slight randomness among top matches) ----
    const pickBest = (arr, scoreFn, topN = 3) => {
      if (!arr.length) return null;
      const scored = arr.map((item) => ({ item, score: scoreFn(item) }));
      scored.sort((a, b) => b.score - a.score);
      const pool = scored.slice(0, Math.min(topN, scored.length));
      return pool[Math.floor(Math.random() * pool.length)].item;
    };

    let outfit = {};

    const useDress = dresses.length > 0 && Math.random() > 0.5;

    if (useDress) {
      const dress = pickBest(dresses, (item) => {
        let score = 0;
        if (seasonMatch(item)) score += 2;
        if (item.favorite) score += 1;
        return score;
      });

      outfit.dress = dress;
      outfit.top = null;
      outfit.bottom = null;

      outfit.shoes = pickBest(shoesList, (item) => {
        let score = 0;
        if (item.occasion === dress.occasion) score += 3;
        score += colorMatchScore(item.color, dress.color);
        if (seasonMatch(item)) score += 1;
        if (item.favorite) score += 1;
        return score;
      });

      outfit.accessory = pickBest(accessories, (item) => {
        let score = 0;
        if (item.occasion === dress.occasion) score += 3;
        score += colorMatchScore(item.color, dress.color);
        if (seasonMatch(item)) score += 1;
        if (item.favorite) score += 1;
        return score;
      });

    } else {
      const top = pickBest(tops, (item) => {
        let score = 0;
        if (seasonMatch(item)) score += 2;
        if (item.favorite) score += 1;
        return score;
      });

      outfit.top = top;
      outfit.dress = null;

      const referenceOccasion = top?.occasion;
      const referenceColor = top?.color;

      outfit.bottom = pickBest(bottoms, (item) => {
        let score = 0;
        if (item.occasion === referenceOccasion) score += 3;
        score += colorMatchScore(item.color, referenceColor);
        if (seasonMatch(item)) score += 1;
        if (item.favorite) score += 1;
        return score;
      });

      const finalOccasion = referenceOccasion || outfit.bottom?.occasion;
      const finalColor = referenceColor || outfit.bottom?.color;

      outfit.shoes = pickBest(shoesList, (item) => {
        let score = 0;
        if (item.occasion === finalOccasion) score += 3;
        score += colorMatchScore(item.color, finalColor);
        if (seasonMatch(item)) score += 1;
        if (item.favorite) score += 1;
        return score;
      });

      outfit.accessory = pickBest(accessories, (item) => {
        let score = 0;
        if (item.occasion === finalOccasion) score += 3;
        score += colorMatchScore(item.color, finalColor);
        if (seasonMatch(item)) score += 1;
        if (item.favorite) score += 1;
        return score;
      });
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