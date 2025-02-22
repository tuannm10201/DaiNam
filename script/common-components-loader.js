async function loadComponent(name) {
  const response = await fetch(`components/${name}/${name}.html`);
  if (response.ok) return await response.text();
  return "";
}

function loadScript(name) {
  const script = document.createElement("script");
  script.src = `components/${name}/${name}.js`;
  document.head.appendChild(script);
}

async function loadHeaderAndFooter() {
  const components = ["header", "footer"];
  const shouldLoadRegisterForm = window.location.pathname !== "/lookup.html";
  if (shouldLoadRegisterForm) {
    components.push("register-form");
  }

  const [headerHTML, footerHTML, registerFormHTML] = await Promise.all(
    components.map(loadComponent)
  );

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  loadScript("header");
  if (shouldLoadRegisterForm) {
    document.body.insertAdjacentHTML("beforeend", registerFormHTML);
    loadScript("register-form");
  }
  document.body.insertAdjacentHTML("beforeend", footerHTML);
  loadScript("footer");
}

loadHeaderAndFooter();
