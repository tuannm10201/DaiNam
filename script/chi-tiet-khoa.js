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
