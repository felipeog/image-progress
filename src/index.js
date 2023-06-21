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
        `Error loading image: ${image.dataset.imageUrl}`
      );
    }
  });

  request.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      const percentage = event.loaded / event.total;

      imageProgress.style.left = `${percentage * 100}%`;
    }
  });

  request.open("GET", image.dataset.imageUrl);
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
    imagePlaceholder.setAttribute("src", image.dataset.placeholderUrl);

    image.append(imagePlaceholder);
  });
}

function handleWindowLoad(_event) {
  const images = document.querySelectorAll(".image");

  setPlaceholders(images);
  setObservers(images);
}

window.addEventListener("load", handleWindowLoad);
