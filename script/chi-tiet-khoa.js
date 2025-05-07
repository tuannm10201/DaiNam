// inject new event
fetch("components/new-event/new-event.html")
  .then((res) => res.text())
  .then((component) => {
    document
      .querySelector(".teachers")
      .insertAdjacentHTML("afterend", component);
  });

// setup swiper
const keyFeaturesSwiperWrapper = document.querySelector(
  ".key-features-swiper .swiper-wrapper"
);
const originalSlides = Array.from(keyFeaturesSwiperWrapper.children);
const keyFeaturesContent1 = keyFeaturesSwiperWrapper.innerHTML;
let keyFeaturesContent2 = "";
let keyFeaturesSwiper;

function createGroupedKeyFeaturesSlides() {
  let groupedHTML = "";

  const row = window.innerWidth >= 1400 ? 4 : 3;

  for (let i = 0; i < originalSlides.length; i += row) {
    groupedHTML += `<div class="swiper-slide d-flex flex-column gap-3 mb-1">`;
    for (let j = i; j < i + row && j < originalSlides.length; j++) {
      groupedHTML += originalSlides[j].outerHTML;
    }
    groupedHTML += `</div>`;
  }

  return groupedHTML;
}

function updateKeyFeaturesSwiperStructure() {
  keyFeaturesContent2 = createGroupedKeyFeaturesSlides();
  if (keyFeaturesSwiperWrapper.innerHTML !== keyFeaturesContent2) {
    keyFeaturesSwiperWrapper.innerHTML = keyFeaturesContent2;
    initKeyFeaturesSwiper();
  }
}

function initKeyFeaturesSwiper() {
  if (keyFeaturesSwiper) {
    keyFeaturesSwiper.destroy(true, true);
  }
  keyFeaturesSwiper = new Swiper(".key-features-swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

updateKeyFeaturesSwiperStructure();
window.addEventListener("resize", updateKeyFeaturesSwiperStructure);

// gallery
const galleryImgRow2 = document.querySelector(".student-img-row-2");
document
  .querySelector(".see-more-container")
  .addEventListener("click", function () {
    galleryImgRow2.classList.remove("d-none");
    this.classList.add("d-none");
  });

// animate number
const DURATION = 1200;
function animateNumber(element, target) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / DURATION, 1);
    element.textContent = Math.floor(progress * target).toLocaleString("vi-VN");
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString("vi-VN");
    }
  }

  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElement = entry.target;
        const target = parseInt(numberElement.dataset.numberTarget);
        animateNumber(numberElement, target);
        observer.unobserve(numberElement);
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll("[data-number-target]")
  .forEach((num) => observer.observe(num));

// Partner logo marquee
function setupPartnerMarquee() {
  const container = document.querySelector(".partner-logo-container");
  if (!container) return; // Skip if container doesn't exist

  new Marquee(container, {
    maxRows: 1,
  });
}

// Initialize partner marquee when DOM is ready
document.addEventListener("DOMContentLoaded", setupPartnerMarquee);

// Student Life Image Popup
// Use the popup elements from the HTML
const popupOverlay = document.querySelector(".student-img-popup-overlay");
const popupImg = popupOverlay.querySelector(".student-img-popup-img");
const closeBtn = popupOverlay.querySelector(".student-img-popup-close");
const prevBtn = popupOverlay.querySelector(".student-img-popup-prev");
const nextBtn = popupOverlay.querySelector(".student-img-popup-next");

// Gather all images in .student-life section
const studentImgs = Array.from(document.querySelectorAll(".student-life img"));
let currentIndex = 0;

// Ensure popup is hidden initially
popupOverlay.classList.remove("active");
popupOverlay.style.display = ""; // Remove inline style if present

// Show popup on image click
studentImgs.forEach((img, idx) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", function () {
    currentIndex = idx;
    showImageByIndex(currentIndex);
    popupOverlay.classList.add("active");
    document.body.classList.add("student-img-popup-open");
  });
});

function showImageByIndex(idx) {
  if (idx < 0) idx = studentImgs.length - 1;
  if (idx >= studentImgs.length) idx = 0;
  currentIndex = idx;
  popupImg.src = studentImgs[currentIndex].src;
}

// Next/Prev button handlers
prevBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  showImageByIndex(currentIndex - 1);
});
nextBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  showImageByIndex(currentIndex + 1);
});

// Close popup on overlay or button click
function closePopup() {
  popupOverlay.classList.remove("active");
  document.body.classList.remove("student-img-popup-open");
  setTimeout(() => {
    if (!popupOverlay.classList.contains("active")) {
      popupImg.src = "";
    }
  }, 300);
}
closeBtn.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", function (e) {
  if (e.target === popupOverlay) closePopup();
});
// Optional: close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
    closePopup();
  }
  // Left/Right arrow navigation
  if (popupOverlay.classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      showImageByIndex(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showImageByIndex(currentIndex + 1);
    }
  }
});

// --- Next/Prev button hover effect for icon swap ---
function setNavBtnHover(btn, isPrev) {
  const img = btn.querySelector("img");
  const defaultSrc = isPrev
    ? "assets/icon/next-page.svg"
    : "assets/icon/next-page.svg";
  const hoverSrc = "assets/icon/next-hover-btn.svg";
  btn.addEventListener("mouseenter", function () {
    img.src = hoverSrc;
    if (isPrev) img.style.transform = "rotate(180deg)";
  });
  btn.addEventListener("mouseleave", function () {
    img.src = defaultSrc;
    if (isPrev) img.style.transform = "rotate(180deg)";
    else img.style.transform = "";
  });
}
setNavBtnHover(prevBtn, true);
setNavBtnHover(nextBtn, false);
