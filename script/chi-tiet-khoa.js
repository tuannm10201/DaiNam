// inject new event
fetch("components/new-event/new-event.html")
  .then((res) => res.text())
  .then((component) => {
    document
      .querySelector(".teachers")
      .insertAdjacentHTML("afterend", component);
  });

// setup swiper

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

// gallery
const galleryImgRow2 = document.querySelector(".student-img-row-2");
document
  .querySelector(".gallery .see-more-container")
  .addEventListener("click", function () {
    galleryImgRow2.classList.remove("d-none");
    this.classList.add("d-none");
  });
