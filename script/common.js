async function loadComponent(file) {
  const response = await fetch(file);
  if (response.ok) return await response.text();
  return "";
}

async function loadHeaderAndFooter() {
  const headerHTML = await loadComponent("../components/header/header.html");
  const footerHTML = await loadComponent("../components/footer/footer.html");

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  const script = document.createElement("script");
  script.src = "../components/header/header.js";
  script.defer = true;
  document.body.appendChild(script);
}

loadHeaderAndFooter();
