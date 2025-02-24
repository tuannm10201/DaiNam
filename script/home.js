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

const swiperWrapper = document.querySelector(".partner-swiper .swiper-wrapper");
const partnerImgLayout1 = swiperWrapper.innerHTML;
let partnerImgLayout2 = "";
let partnerSwiper;

function createGroupedSlides() {
  const originalSlides = Array.from(swiperWrapper.children).map(
    (slide) => slide.querySelector("img").src
  );
  let groupedHTML = "";

  for (let i = 0; i < originalSlides.length; i += 4) {
    groupedHTML += `<div class="swiper-slide">`;
    for (let j = i; j < i + 4 && j < originalSlides.length; j++) {
      groupedHTML += `<img src="${originalSlides[j]}" />`;
    }
    groupedHTML += `</div>`;
  }

  return groupedHTML;
}

function updatePartnerSwiperStructure() {
  if (window.innerWidth < 992) {
    if (partnerImgLayout2 === "") {
      partnerImgLayout2 = createGroupedSlides();
    }
    if (swiperWrapper.innerHTML !== partnerImgLayout2) {
      swiperWrapper.innerHTML = partnerImgLayout2;
      initSwiper();
    }
  } else if (swiperWrapper.innerHTML !== partnerImgLayout1) {
    swiperWrapper.innerHTML = partnerImgLayout1;
    initSwiper();
  }
  if (!partnerSwiper) initSwiper();
}

function initSwiper() {
  if (partnerSwiper) {
    partnerSwiper.destroy(true, true);
  }
  partnerSwiper = new Swiper(".partner-swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
    spaceBetween: 25,
  });
}

updatePartnerSwiperStructure();
window.addEventListener("resize", updatePartnerSwiperStructure);

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
