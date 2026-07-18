const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "closetvault",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "heic"],
  },
});

const upload = multer({ storage });

module.exports = upload;