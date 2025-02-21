const newSeeAllMobile = document.getElementById("new-see-all-mobile");
const triggerSeeAllMobile = document.getElementById(
  "trigger-new-see-all-mobile"
);

function handleClickOutside(event) {
  if (
    !newSeeAllMobile.contains(event.target) &&
    !triggerSeeAllMobile.contains(event.target) &&
    newSeeAllMobile.classList.contains("show")
  ) {
    triggerSeeAllMobile.click();
  }
}

function handleResize() {
  if (window.innerWidth > 1199.98) {
    document.removeEventListener("click", handleClickOutside);
  } else {
    document.addEventListener("click", handleClickOutside);
  }
}

window.addEventListener("resize", handleResize);
handleResize();
