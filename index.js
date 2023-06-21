const imageUrl = "https://i.postimg.cc/wxP1WpL6/felipe.png";
const placeholderUrl = "https://i.postimg.cc/8Cj5dXcF/felipe-placeholder.webp";
const dimensions = {
  width: 300,
  height: 300,
};

window.addEventListener("load", () => {
  const imageContainer = document.querySelector(".image-container");
  const imagePlaceholder = document.querySelector(".image-placeholder");
  const image = document.querySelector(".image");
  const imageProgress = document.querySelector(".image-progress");
  const request = new XMLHttpRequest();

  // imageContainer.style.width = `${dimensions.width}px`;
  // imageContainer.style.height = `${dimensions.height}px`;
  imagePlaceholder.src = placeholderUrl;

  request.addEventListener("abort", (event) => {
    console.log("abort");
    console.log(event);
  });
  request.addEventListener("error", (event) => {
    console.log("error");
    console.log(event);
  });
  request.addEventListener("load", (event) => {
    console.log("load");
    console.log(event);

    const arrayBuffer = new Uint8Array(event.target.response);
    const blob = new Blob([arrayBuffer]);
    const blobUrl = URL.createObjectURL(blob);

    image.src = blobUrl;
  });
  request.addEventListener("loadend", (event) => {
    console.log("loadend");
    console.log(event);

    imageContainer.classList.add("image-container--loaded");
  });
  request.addEventListener("loadstart", (event) => {
    console.log("loadstart");
    console.log(event);
  });
  request.addEventListener("progress", (event) => {
    console.log("progress");
    console.log(event);

    if (event.lengthComputable) {
      const percentage = event.loaded / event.total;

      imageProgress.style.right = `${100 - percentage * 100}%`;
    }
  });
  request.addEventListener("readystatechange", (event) => {
    console.log("readystatechange");
    console.log(event);
  });
  request.addEventListener("timeout", (event) => {
    console.log("timeout");
    console.log(event);
  });

  request.open("GET", imageUrl);
  request.responseType = "arraybuffer";
  request.send();
});
