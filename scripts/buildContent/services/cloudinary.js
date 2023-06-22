const cloudinary = require("cloudinary");

const requiredVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const hasRequiredVars = requiredVars.every((envVar) =>
  Boolean(process.env[envVar])
);

if (!hasRequiredVars) {
  throw new Error("missing env vars");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
