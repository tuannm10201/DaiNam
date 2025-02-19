// inject new event
fetch("components/new-event/new-event.html")
  .then((res) => res.text())
  .then((component) => {
    document
      .querySelector(".teachers")
      .insertAdjacentHTML("afterend", component);
  });

// setup swiper
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

// gallery
const galleryImgRow2 = document.querySelector(".student-img-row-2");
document
  .querySelector(".gallery .see-more-container")
  .addEventListener("click", function () {
    galleryImgRow2.classList.remove("d-none");
    this.classList.add("d-none");
  });
