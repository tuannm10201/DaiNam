// inject new event
fetch("components/new-event/new-event.html")
  .then((res) => res.text())
  .then((component) => {
    document
      .querySelector(".feelings")
      .insertAdjacentHTML("afterend", component);
  });

// setup swiper
new Swiper(".banner-swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: SLIDE_DELAY,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      eventSwiperBorderBottom.style.width = (1 - progress) * 100 + "%";
    },
  },
});

let reasonSwiper;
const reasonSwiperContainer = document.querySelector(".reason-swiper");
const reasonSwiperWrapper =
  reasonSwiperContainer.querySelector(".swiper-wrapper");

function initReasonSwiper() {
  const isEnableSwiper = window.innerWidth >= 768;

  reasonSwiperContainer.classList.toggle("swiper", isEnableSwiper);
  reasonSwiperWrapper.classList.toggle("overflow-x-auto", !isEnableSwiper);
  if (isEnableSwiper) {
    reasonSwiper = new Swiper(".reason-swiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 4,
      breakpoints: {
        0: {
          enabled: false,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          enabled: true,
          spaceBetween: 25,
        },
        992: {
          slidesPerView: 3,
          enabled: true,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 4,
          enabled: true,
          spaceBetween: 25,
        },
      },
      spaceBetween: 28,
    });
  } else if (reasonSwiper) {
    reasonSwiper.destroy(true, true);
    reasonSwiper = null;
  }
}

initReasonSwiper();
window.addEventListener("resize", initReasonSwiper);

// reason video
const reasonVideo = document.getElementById("reason-video");
const playButton = document.getElementById("reason-play-button");

playButton.addEventListener("click", () => {
  reasonVideo.play();
  playButton.classList.add("d-none");
  reasonVideo.setAttribute("controls", true);
});
reasonVideo.addEventListener("pause", () => {
  playButton.classList.remove("d-none");
  reasonVideo.setAttribute("controls", false);
});
reasonVideo.addEventListener("play", () => {
  playButton.classList.add("d-none");
});
reasonVideo.addEventListener("click", () => {
  if (reasonVideo.paused) {
    reasonVideo.play();
  } else {
    reasonVideo.pause();
  }
});

// student life
const studentImgRow2 = document.querySelector(".student-img-row-2");
const studentShowMore = document.querySelector(
  ".student-life .see-more-container"
);
studentShowMore.addEventListener("click", function () {
  studentImgRow2.classList.remove("d-none");
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
  let marquee = new Marquee(container, {
    minImagesPerRow: 10,
    maxRows: () => (window.innerWidth < 768 ? 2 : 3), // Responsive rows
  });

  // Track screen size to rebuild marquee when crossing breakpoints
  let isMobile = window.innerWidth < 768;
  let resizeTimeout;

  // Add resize listener to handle responsive changes with throttling
  window.addEventListener("resize", () => {
    // Clear previous timeout
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    // Set a timeout to avoid multiple rebuilds during resize
    resizeTimeout = setTimeout(() => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth < 768;

      // Only rebuild marquee when crossing the breakpoint
      if (wasMobile !== isMobile) {
        // Remove loaded class before rebuilding
        container.classList.remove("loaded");

        marquee = new Marquee(container, {
          minImagesPerRow: 10,
          maxRows: () => (window.innerWidth < 768 ? 2 : 3),
        });
      }
    }, 50);
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
