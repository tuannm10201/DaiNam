/**
 * Marquee.js - A lightweight marquee effect library
 * Based on the vanilla-marquee concept
 */

class Marquee {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign(
      {
        direction: "left",
        speed: 20,
        gap: "2rem",
        minImagesPerRow: 10,
        maxRows: 3,
        pauseOnHover: false,
      },
      options
    );

    this.init();
  }

  init() {
    // Clear existing content and save original images
    const originalImages = Array.from(this.container.querySelectorAll("img"));
    this.container.innerHTML = "";

    if (originalImages.length === 0) {
      // If no images, still mark as loaded to show empty container
      this.container.classList.add("loaded");
      return;
    }

    // Calculate rows and images per row
    const totalImages = originalImages.length;
    // Limit rows based on screen size if maxRows is responsive
    let maxRows = this.options.maxRows;
    if (typeof maxRows === "function") {
      maxRows = maxRows();
    }

    const numRows = Math.min(
      maxRows,
      Math.ceil(totalImages / this.options.minImagesPerRow)
    );
    const imagesPerRow = Math.ceil(totalImages / numRows);

    // Track initialization of rows to show container only when all rows are ready
    let initializedRows = 0;

    // Create rows
    for (let i = 0; i < numRows; i++) {
      // Get images for this row
      const startIdx = i * imagesPerRow;
      const endIdx = Math.min(startIdx + imagesPerRow, totalImages);
      const rowImages = originalImages.slice(startIdx, endIdx);

      if (rowImages.length === 0) {
        initializedRows++;
        // Check if all rows are initialized
        if (initializedRows === numRows) {
          this.container.classList.add("loaded");
        }
        continue;
      }

      // Create row container
      const row = document.createElement("div");
      row.className = "partner-row";

      // Create marquee wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "partner-marquee-wrapper";

      // Set direction for this row (alternate)
      const direction = i % 2 === 0 ? "left" : "right";

      // Create content element (first copy)
      const content = document.createElement("div");
      content.className = "partner-marquee-content";
      content.style.gap = this.options.gap;

      // Add images to content
      rowImages.forEach((img) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "partner-img-container";
        imgContainer.appendChild(img.cloneNode(true));
        content.appendChild(imgContainer);
      });

      // Add first copy to wrapper
      wrapper.appendChild(content);

      // Append to DOM to measure
      row.appendChild(wrapper);
      this.container.appendChild(row);

      // Measure after appending to DOM
      setTimeout(() => {
        const containerWidth = wrapper.offsetWidth;
        const contentWidth = content.offsetWidth;

        // Calculate how many copies needed to fill container at least twice
        // (ensures no gaps during animation)
        const neededCopies = Math.max(
          4,
          Math.ceil((containerWidth * 2) / contentWidth) + 1
        );

        // Add required number of copies
        for (let j = 1; j < neededCopies; j++) {
          const clone = content.cloneNode(true);
          wrapper.appendChild(clone);
        }

        // Calculate animation duration based on content width and speed
        // Higher speed value = faster animation = shorter duration
        const duration = contentWidth / this.options.speed;

        // Apply animations after a short delay to ensure proper positioning
        setTimeout(() => {
          // For right direction, we need special handling
          if (direction === "right") {
            // Position all contents
            const contents = Array.from(wrapper.children);

            // For right-to-left, first position all elements
            contents.forEach((elem, index) => {
              if (index === 0) {
                // Position first element at negative 100%
                elem.style.transform = "translate3d(-100%, 0, 0)";
              }

              // Apply animation to all elements
              elem.style.animationName = "marquee-right";
              elem.style.animationDuration = `${duration}s`;
              elem.style.animationTimingFunction = "linear";
              elem.style.animationIterationCount = "infinite";
              elem.style.animationDelay = "0s";
            });
          } else {
            // Left direction is simpler
            Array.from(wrapper.children).forEach((elem) => {
              elem.style.animationName = "marquee-left";
              elem.style.animationDuration = `${duration}s`;
              elem.style.animationTimingFunction = "linear";
              elem.style.animationIterationCount = "infinite";
              elem.style.animationDelay = "0s";
            });
          }

          // Add hover pause functionality if enabled
          if (this.options.pauseOnHover) {
            wrapper.addEventListener("mouseenter", () => {
              Array.from(wrapper.children).forEach((child) => {
                child.style.animationPlayState = "paused";
              });
            });

            wrapper.addEventListener("mouseleave", () => {
              Array.from(wrapper.children).forEach((child) => {
                child.style.animationPlayState = "running";
              });
            });
          }

          // Track row initialization
          initializedRows++;

          // Add loaded class to make container visible when all rows are ready
          if (initializedRows === numRows) {
            this.container.classList.add("loaded");
          }
        }, 50);
      }, 10);
    }
  }
}

// Make it available globally
window.Marquee = Marquee;
