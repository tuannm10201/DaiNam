// handle nav search
const otherNavItem = document.querySelectorAll(
  "#bottom-nav .navbar-nav .nav-item:not(.nav-search-icon)"
);
const navSearchs = document.querySelectorAll(".nav-search");
const navSearchInputs = document.querySelectorAll(".nav-search-input");
const navSearchIcons = document.querySelectorAll(".nav-search-icon");
const clearSearchIcons = document.querySelectorAll(".clear-search-icon");

navSearchIcons.forEach((searchIcon, index) => {
  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();

    // handle web
    if (index === 1) {
      otherNavItem.forEach((navItem) => {
        navItem.classList.add("d-none");
      });
    }
    navSearchs[index].classList.remove("d-none");
    navSearchInputs[index].style.width = "0";
    requestAnimationFrame(() => {
      navSearchInputs[index].style.width = "100%";
      navSearchInputs[index].focus();
    });
  });
});
// reset state
clearSearchIcons.forEach((clearIcon, index) => {
  clearIcon.addEventListener("click", () => {
    if (index === 1) {
      otherNavItem.forEach((navItem) => {
        navItem.classList.remove("d-none");
      });
    }
    navSearchs[index].classList.add("d-none");
  });
});

function closeSearch() {
  navSearchs.forEach((search, index) => {
    if (!search.classList.contains("d-none")) {
      search.classList.add("d-none");
      if (index === 1) {
        otherNavItem.forEach((navItem) => {
          navItem.classList.remove("d-none");
        });
      }
    }
  });
}

// responsive
// handle top nav mobile
const topNav = document.querySelector(".top-nav-container");
const bottomNav = document.getElementById("bottom-nav");
const botNav = document.querySelector(".bot-nav-container");

const kvttDropdown = document.getElementById("kvtt-dropdown");
const topNavItems = document.querySelectorAll(
  ".top-left-nav .nav-item:has(>.dropdown-menu)"
);

const kvttDropdownMenu = document.querySelector(".kvtt-dropdown-menu");
const kvttDropdownMenuChildren = kvttDropdownMenu.querySelectorAll(".nav-item");

const botNavItems = document.querySelectorAll(".bot-nav .nav-item");

const TOP_NAV_BREAKPOINT = 1400;
const BOT_NAV_BREAKPOINT = 1200;
let lastStage = null;
let shouldTopNavShrink = false;
let shouldBotNavShrink = false;

function onInitAndResize() {
  const { innerWidth } = window;
  const checkShouldTopNavShrink = innerWidth < TOP_NAV_BREAKPOINT;
  const checkShouldBotNavShrink = innerWidth < BOT_NAV_BREAKPOINT;

  if (checkShouldBotNavShrink !== shouldBotNavShrink) {
    shouldBotNavShrink = checkShouldBotNavShrink;
    botNavItems.forEach((navItem) => {
      if (navItem.classList.contains("dropdown")) {
        const dropdownChildItem = navItem.querySelector(".dropdown-menu");
        navItem.classList.toggle("click-dropdown", shouldBotNavShrink);
        dropdownChildItem.classList.toggle(
          "dropdown-click-menu",
          shouldBotNavShrink
        );
      }
    });
    closeSearch();
    topNavItems.forEach((navItem) => {
      const topNavItemDropdownMenu = navItem.querySelector(".dropdown-menu");
      navItem.classList.toggle("click-dropdown", shouldBotNavShrink);
      topNavItemDropdownMenu.classList.toggle(
        "dropdown-click-menu",
        shouldBotNavShrink
      );
    });
    if (shouldBotNavShrink) {
      bottomNav.appendChild(topNav);
      kvttDropdown.dataset.bsAutoClose = "outside";
    } else {
      document.body.prepend(topNav);
      kvttDropdown.dataset.bsAutoClose = "";
    }
  }

  if (checkShouldTopNavShrink !== shouldTopNavShrink) {
    shouldTopNavShrink = checkShouldTopNavShrink;
    kvttDropdownMenu.classList.toggle("dropdown-menu", shouldTopNavShrink);
    if (!shouldBotNavShrink) {
      kvttDropdownMenuChildren.forEach((child) => {
        child.classList.toggle("dropdown-item", shouldTopNavShrink);
        child.classList.replace(
          shouldTopNavShrink ? "dropdown" : "dropend",
          shouldTopNavShrink ? "dropend" : "dropdown"
        );
      });
    }
  }

  const currentStage =
    innerWidth < BOT_NAV_BREAKPOINT
      ? "small"
      : innerWidth < TOP_NAV_BREAKPOINT
      ? "medium"
      : "large";

  if (currentStage !== lastStage) {
    lastStage = currentStage;
    updateEventDropList();
  }
}

function updateEventDropList() {
  const dropList = document.querySelectorAll(
    ".top-nav-container .dropdown:not(.click-dropdown), .top-nav-container .dropend, " +
      ".bot-nav-container .dropdown:not(.click-dropdown), .bot-nav-container .dropend"
  );
  const clickDropList = document.querySelectorAll(".click-dropdown");

  [...clickDropList, ...dropList].forEach((dropdown) => {
    dropdown.removeEventListener("mouseenter", onMountEnterDropdown);
    dropdown.removeEventListener("mouseleave", onMountLeaveDropdown);
    dropdown.removeEventListener("click", onClickDropdown);
  });

  clickDropList.forEach((dropdown) =>
    dropdown.addEventListener("click", onClickDropdown)
  );
  dropList.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", onMountEnterDropdown);
    dropdown.addEventListener("mouseleave", onMountLeaveDropdown);
  });
}

// onInit
onInitAndResize();
window.addEventListener("resize", onInitAndResize);

function onClickDropdown() {
  const menu = this.querySelector(".dropdown-menu");
  const isOpen = menu.classList.contains("show");

  menu.style.maxHeight = isOpen ? menu.scrollHeight + "px" : "0";
  setTimeout(() => {
    menu.style.padding = isOpen ? "0.5rem 0" : "0";
  }, 100);
}

function onMountEnterDropdown() {
  const menu = this.querySelector(".dropdown-menu");
  menu.style.padding = "0.5rem 0";
  menu.style.maxHeight = menu.scrollHeight + "px";
}

function onMountLeaveDropdown() {
  const menu = this.querySelector(".dropdown-menu");
  menu.style.maxHeight = "0";
  setTimeout(() => {
    menu.style.padding = "0";
  }, 100);
}

function handleClickOutside(event) {
  const inputSearch = document.querySelector(".nav-search:not(.d-none)"); // Element to check
  const iconSearchs = document.querySelectorAll(".nav-search-icon"); // Element to ignore

  const clickedInsideExcluded = [...iconSearchs].some((exclude) =>
    exclude.contains(event.target)
  );

  if (
    inputSearch &&
    !inputSearch.contains(event.target) &&
    !clickedInsideExcluded
  ) {
    closeSearch();
  }
}

document.addEventListener("click", handleClickOutside);
