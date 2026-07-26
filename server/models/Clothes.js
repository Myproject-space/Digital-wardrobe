const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    season: {
      type: String,
      required: true,
    },

    occasion: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clothes", clothesSchema);