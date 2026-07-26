const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    top: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes",
    },

    bottom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes",
    },

    shoes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Outfit", outfitSchema);