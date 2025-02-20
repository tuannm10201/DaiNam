const SLIDE_DELAY = 5000;
const eventSwiperBorderBottom = document.querySelector(".swiper-border-bottom");

// handle scroll top btn
const backToTopBtn = document.createElement("button");
backToTopBtn.className = "btn btn-light to-top-btn fw-bold hover-ff77";

const div = document.createElement("div");
div.className = "d-flex gap-2";
div.innerHTML = `Về đầu trang <img src="assets/icon/arrow-up.svg" />`;

backToTopBtn.appendChild(div);
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
