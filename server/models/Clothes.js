const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema(
  {
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

    size: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    season: {
  type: String,
  default: "",
},

occasion: {
  type: String,
  default: "",
},

    image: {
      type: String,
      default: "",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clothes", clothesSchema);