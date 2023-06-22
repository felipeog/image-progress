import { loadImage } from "./loadImage";

function handleIntersect(entries, intersectionObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target);

      intersectionObserver.unobserve(entry.target);
    }
  });
}

export function setIntersectionObservers(images) {
  const intersectionObserver = new IntersectionObserver(handleIntersect, {
    rootMargin: "200px",
  });

  images.forEach((image) => {
    intersectionObserver.observe(image);
  });
}
