const path = require("path");

const { cloudinary } = require("../services/cloudinary");

async function uploadFile(folderName, imageName) {
  console.log("uploadFile - start", folderName, imageName);

  const inputPath = path.resolve(__dirname, `../${folderName}/${imageName}`);

  try {
    await cloudinary.v2.uploader.upload(inputPath, {
      folder: folderName,
      use_filename: true,
      unique_filename: false,
    });
  } catch (error) {
    console.log("error @ uploadFile", error);
  }

  console.log("uploadFile - end");
}

module.exports = { uploadFile };
