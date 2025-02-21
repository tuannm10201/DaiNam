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

new Swiper(".reason-swiper", {
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
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  spaceBetween: 28,
});

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

// training nav tab
const navWrapper = document.querySelector(".nav-wrapper");
const leftArrow = document.querySelector(".training-scroll-btn.start-0");
const rightArrow = document.querySelector(".training-scroll-btn.end-0");

function scrollNav(direction) {
  navWrapper.scrollBy({ left: direction * 100, behavior: "smooth" });
}
function updateArrows() {
  leftArrow.style.display = navWrapper.scrollLeft > 0 ? "block" : "none";
  rightArrow.style.display =
    navWrapper.scrollLeft < navWrapper.scrollWidth - navWrapper.clientWidth
      ? "block"
      : "none";
}
updateArrows();
leftArrow.addEventListener("click", () => {
  scrollNav(-1);
});
rightArrow.addEventListener("click", () => {
  scrollNav(1);
});
navWrapper.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

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
