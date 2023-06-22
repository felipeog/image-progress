const { glob } = require("glob");

const { outputFolderPath } = require("../consts/outputFolderPath");
const { imageGlobPattern } = require("../consts/imageGlobPattern");
const { cloudinary } = require("../services/cloudinary");

async function uploadVersions() {
  console.log("uploadVersions - start");

  const imagesPaths = glob.sync(`${outputFolderPath}/${imageGlobPattern}`);

  for (let index = 0; index < imagesPaths.length; index++) {
    const imagePath = imagesPaths[index];

    console.log("uploadVersions -", imagePath);

    try {
      await cloudinary.v2.uploader.upload(imagePath, {
        folder: "image-progress",
        use_filename: true,
        unique_filename: false,
      });
    } catch (error) {
      console.log("error @ uploadVersions", error);
    }
  }

  console.log("uploadVersions - end");
}

module.exports = { uploadVersions };
