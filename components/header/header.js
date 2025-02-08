const dropdowns = document.querySelectorAll(
  ".nav-item.dropdown:not(.language-dropdown)"
);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("mouseenter", function () {
    const menu = this.querySelector(".dropdown-menu");
    menu.style.maxHeight = menu.scrollHeight + "px";
  });

  dropdown.addEventListener("mouseleave", function () {
    const menu = this.querySelector(".dropdown-menu");
    menu.style.maxHeight = "0px";
  });
});

// handle nav search
const otherNavItem = document.querySelectorAll(
  "#bottomNav .navbar-nav .nav-item"
);
const navSearch = document.getElementById("nav-search");
const navSearchInput = document.getElementById("nav-search-input");
// hide other nav item
document.getElementById("nav-search-icon").addEventListener("click", (e) => {
  e.preventDefault();
  otherNavItem.forEach((navItem) => {
    navItem.classList.add("d-none");
  });
  navSearch.classList.remove("d-none");
  navSearchInput.style.width = "0";
  navSearchInput.style.transition = "width 0.5s ease-in-out";
  requestIdleCallback(() => {
    navSearchInput.style.width = "100%";
    navSearchInput.focus();
  });
});
// reset state
document.getElementById("clear-search").addEventListener("click", () => {
  otherNavItem.forEach((navItem) => {
    navItem.classList.remove("d-none");
  });
  navSearch.classList.add("d-none");
});
