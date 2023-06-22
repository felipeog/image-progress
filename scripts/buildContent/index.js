require("dotenv").config();

const { createVersions } = require("./utils/createVersions");
const { uploadVersions } = require("./utils/uploadVersions");

async function run() {
  await createVersions();
  await uploadVersions();
}

run();
