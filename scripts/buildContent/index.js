require("dotenv").config();

const path = require("path");
const { glob } = require("glob");

const { createPlaceholder } = require("./utils/createPlaceholder");
const { uploadFile } = require("./utils/uploadFile");

async function run() {
  // upload original images and create placeholders
  const images = glob.sync(
    path.resolve(__dirname, "./images/*.{gif,jpeg,jpg,png,svg,webp}")
  );
  const imagesNames = images.map((image) => path.basename(image));

  for (let index = 0; index < imagesNames.length; index++) {
    const imageName = imagesNames[index];

    await uploadFile("images", imageName);
    await createPlaceholder(imageName);
  }

  // upload placeholders
  const placeholders = glob.sync(
    path.resolve(__dirname, "./placeholders/*.webp")
  );
  const placeholdersNames = placeholders.map((placeholder) =>
    path.basename(placeholder)
  );

  for (let index = 0; index < placeholdersNames.length; index++) {
    const placeholderName = placeholdersNames[index];

    await uploadFile("placeholders", placeholderName);
  }
}

run();
