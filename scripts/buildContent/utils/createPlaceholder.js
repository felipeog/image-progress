const path = require("path");
const sharp = require("sharp");

async function createPlaceholder(imageName) {
  console.log("createPlaceholder - start", imageName);

  const [name, _extension] = imageName.split(".");
  const inputPath = path.resolve(__dirname, `../images/${imageName}`);
  const outputPath = path.resolve(
    __dirname,
    `../placeholders/${name}_placeholder.webp`
  );

  try {
    await sharp(inputPath)
      .resize({ width: 20 })
      .webp({ quality: 20 })
      .toFile(outputPath);
  } catch (error) {
    console.log("error @ createPlaceholder", error);
  }

  console.log("createPlaceholder - end");
}

module.exports = { createPlaceholder };
