const baseUrl =
  "https://res.cloudinary.com/felipeog/image/upload/image-progress";

function getImageUrl(imageName) {
  const imageBaseUrl = `${baseUrl}/${imageName}`;
  const windowWidth = window.innerWidth;
  const pixelRatio = window.devicePixelRatio;

  // higher pixel ratio
  if (pixelRatio > 1) {
    if (windowWidth <= 320) {
      return `${imageBaseUrl}_640w.jpg`;
    }

    if (windowWidth <= 640) {
      return `${imageBaseUrl}_1280w.jpg`;
    }

    if (windowWidth <= 960) {
      return `${imageBaseUrl}_1920w.jpg`;
    }

    if (windowWidth <= 1280) {
      return `${imageBaseUrl}_2560w.jpg`;
    }

    return `${imageBaseUrl}_3840w.jpg`;
  }

  // lower pixel ratio
  if (windowWidth <= 640) {
    return `${imageBaseUrl}_640w.jpg`;
  }

  if (windowWidth <= 1280) {
    return `${imageBaseUrl}_1280w.jpg`;
  }

  if (windowWidth <= 1920) {
    return `${imageBaseUrl}_1920w.jpg`;
  }

  if (windowWidth <= 2560) {
    return `${imageBaseUrl}_2560w.jpg`;
  }

  return `${imageBaseUrl}_3840w.jpg`;
}

function loadImage(image) {
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

function handleIntersect(entries, intersectionObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target);

      intersectionObserver.unobserve(entry.target);
    }
  });
}

function setObservers(images) {
  const intersectionObserver = new IntersectionObserver(handleIntersect, {
    rootMargin: "200px",
  });

  images.forEach((image) => {
    intersectionObserver.observe(image);
  });
}

function setPlaceholders(images) {
  images.forEach((image) => {
    const imagePlaceholder = document.createElement("img");

    imagePlaceholder.classList.add("image__placeholder");
    imagePlaceholder.setAttribute(
      "src",
      `${baseUrl}/${image.dataset.imageName}_30w.webp`
    );

    image.append(imagePlaceholder);
  });
}

function handleWindowLoad(_event) {
  const images = document.querySelectorAll(".image");

  setPlaceholders(images);
  setObservers(images);
}

window.addEventListener("load", handleWindowLoad);
