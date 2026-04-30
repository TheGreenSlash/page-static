document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".seq-key-a");
  let currentIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "a") {
      if (currentIndex > 0) {
        keys[currentIndex - 1].classList.remove(
          "bg-amber-500",
          "text-black",
          "border-b-2",
        );
        currentIndex--;
        return;
      } else {
        return;
      }
    }

    if (currentIndex < keys.length) {
      keys[currentIndex].classList.add(
        "bg-amber-500",
        "text-black",
        "border-b-2",
      );
      currentIndex++;
      console.log("current index of a key" + currentIndex);
      if (currentIndex > 1) {
        window.location.href = "blogs.html";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".seq-key-s");
  let currentIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "s") {
      if (currentIndex > 0) {
        keys[currentIndex - 1].classList.remove(
          "bg-amber-500",
          "text-black",
          "border-b-2",
        );
        currentIndex--;
        return;
      } else {
        return;
      }
    }
    if (currentIndex < keys.length) {
      keys[currentIndex].classList.add(
        "bg-amber-500",
        "text-black",
        "border-b-2",
      );
      currentIndex++;
      if (currentIndex > 1) {
        console.log("reached projects link");
        window.location.href = "projects.html";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".seq-key-d");
  let currentIndex = 0;

  document.addEventListener("keydown", (e) => {
    // if (e.key.toLowerCase() !== "d") return;

    if (e.key.toLowerCase() !== "d") {
      if (currentIndex > 0) {
        keys[currentIndex - 1].classList.remove(
          "bg-amber-500",
          "text-black",
          "border-b-2",
        );
        currentIndex--;
        return;
      } else {
        return;
      }
    }

    if (currentIndex < keys.length) {
      keys[currentIndex].classList.add(
        "bg-amber-500",
        "text-black",
        "border-b-2",
      );
      currentIndex++;
      if (currentIndex > 1) {
        console.log("reached about link");
        window.location.href = "about.html";
      }
    }
  });
});
