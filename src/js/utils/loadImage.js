import { imageBaseUrl } from "../consts/imageBaseUrl";

function getImageUrl(imageName) {
  const windowWidth = window.innerWidth;
  const pixelRatio = window.devicePixelRatio;

  // higher pixel ratio
  if (pixelRatio > 1) {
    if (windowWidth <= 320) {
      return `${imageBaseUrl}/${imageName}_640w.jpg`;
    }

    if (windowWidth <= 640) {
      return `${imageBaseUrl}/${imageName}_1280w.jpg`;
    }

    if (windowWidth <= 960) {
      return `${imageBaseUrl}/${imageName}_1920w.jpg`;
    }

    if (windowWidth <= 1280) {
      return `${imageBaseUrl}/${imageName}_2560w.jpg`;
    }

    return `${imageBaseUrl}/${imageName}_3840w.jpg`;
  }

  // lower pixel ratio
  if (windowWidth <= 640) {
    return `${imageBaseUrl}/${imageName}_640w.jpg`;
  }

  if (windowWidth <= 1280) {
    return `${imageBaseUrl}/${imageName}_1280w.jpg`;
  }

  if (windowWidth <= 1920) {
    return `${imageBaseUrl}/${imageName}_1920w.jpg`;
  }

  if (windowWidth <= 2560) {
    return `${imageBaseUrl}/${imageName}_2560w.jpg`;
  }

  return `${imageBaseUrl}/${imageName}_3840w.jpg`;
}

export function loadImage(image) {
  const imageContent = document.createElement("img");
  const imageProgress = document.createElement("div");
  const request = new XMLHttpRequest();

  imageContent.classList.add("image__content");
  imageProgress.classList.add("image__progress");

  image.append(imageContent, imageProgress);

  request.addEventListener("load", (event) => {
    const arrayBuffer = new Uint8Array(event.target.response);
    const blob = new Blob([arrayBuffer]);
    const blobUrl = URL.createObjectURL(blob);

    imageContent.src = blobUrl;
  });

  request.addEventListener("loadend", (event) => {
    image.classList.add("image--loaded");

    if (event.target.status !== 200) {
      image.classList.add("image--error");
      imageContent.setAttribute(
        "title",
        `Error loading image: ${image.dataset.imageName}`
      );
    }
  });

  request.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      const percentage = event.loaded / event.total;

      imageProgress.style.left = `${percentage * 100}%`;
    }
  });

  request.open("GET", getImageUrl(image.dataset.imageName));
  request.responseType = "arraybuffer";
  request.send();
}
