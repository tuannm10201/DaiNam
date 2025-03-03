// setup swiper
new Swiper(".banner-swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: SLIDE_DELAY,
  // },
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
      loop: true,
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

new Swiper(".partner-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
  spaceBetween: 25,
});

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
