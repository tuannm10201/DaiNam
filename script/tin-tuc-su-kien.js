new Swiper(".new-swiper", {
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

let eventSwiper;
const eventSwiperContainer = document.querySelector(".event-swiper");
const eventSwiperWrapper =
  eventSwiperContainer.querySelector(".swiper-wrapper");

function initSwiper() {
  const isEnableSwiper = window.innerWidth >= 992;

  eventSwiperContainer.classList.toggle("swiper", isEnableSwiper);
  eventSwiperWrapper.classList.toggle("overflow-x-auto", !isEnableSwiper);
  if (isEnableSwiper) {
    eventSwiper = new Swiper(".event-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 5,
      breakpoints: {
        0: {
          enabled: false,
          spaceBetween: 0,
        },
        992: {
          slidesPerView: 2,
          enabled: true,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 3,
          enabled: true,
          spaceBetween: 25,
        },
      },
    });
  } else if (eventSwiper) {
    eventSwiper.destroy(true, true);
    eventSwiper = null;
  }
}

initSwiper();
window.addEventListener("resize", initSwiper);
