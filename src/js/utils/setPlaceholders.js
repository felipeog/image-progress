import { imageBaseUrl } from "../consts/imageBaseUrl";

export function setPlaceholders(images) {
  images.forEach((image) => {
    const imagePlaceholder = document.createElement("img");

    imagePlaceholder.classList.add("image__placeholder");
    imagePlaceholder.setAttribute(
      "src",
      `${imageBaseUrl}/${image.dataset.imageName}_30w.webp`
    );

    image.append(imagePlaceholder);
  });
}
