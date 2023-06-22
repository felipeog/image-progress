import { setIntersectionObservers } from "../utils/setIntersectionObservers";
import { setPlaceholders } from "../utils/setPlaceholders";

export function handleWindowLoad(_event) {
  const images = document.querySelectorAll(".image");

  setPlaceholders(images);
  setIntersectionObservers(images);
}
