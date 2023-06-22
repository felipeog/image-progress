const path = require("path");
const sharp = require("sharp");
const { glob } = require("glob");

const { inputFolderPath } = require("../consts/inputFolderPath");
const { outputFolderPath } = require("../consts/outputFolderPath");
const { imageGlobPattern } = require("../consts/imageGlobPattern");

async function createVersions() {
  console.log("createVersions - start");

  const imagesPaths = glob.sync(`${inputFolderPath}/${imageGlobPattern}`);

  for (let index = 0; index < imagesPaths.length; index++) {
    const imagePath = imagesPaths[index];
    const baseName = path.basename(imagePath);
    const [name, extension] = baseName.split(".");

    console.log("createVersions -", imagePath);

    try {
      await sharp(imagePath).toFile(
        `${outputFolderPath}/${name}_3840w.${extension}`
      );

      await sharp(imagePath)
        .resize({ width: 2560 })
        .toFile(`${outputFolderPath}/${name}_2560w.${extension}`);

      await sharp(imagePath)
        .resize({ width: 1920 })
        .toFile(`${outputFolderPath}/${name}_1920w.${extension}`);

      await sharp(imagePath)
        .resize({ width: 1280 })
        .toFile(`${outputFolderPath}/${name}_1280w.${extension}`);

      await sharp(imagePath)
        .resize({ width: 640 })
        .toFile(`${outputFolderPath}/${name}_640w.${extension}`);

      await sharp(imagePath)
        .resize({ width: 30 })
        .webp({ quality: 30 })
        .toFile(`${outputFolderPath}/${name}_30w.webp`);
    } catch (error) {
      console.log("error @ createVersions", error);
    }
  }

  console.log("createVersions - end");
}

module.exports = { createVersions };
