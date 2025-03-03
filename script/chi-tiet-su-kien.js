import { renderBreadcrumb } from "../components/breadcrumb/breadcrumb.js";

const breadcrumbLinks = [
  { name: "Tin tức & Sự kiện", url: "index.html" },
  { name: "Tin tức ", url: "library.html" },
  { name: "Khoa Thương mại điện tử và Kinh tế số", url: null }, // Active page (không có link)
];

renderBreadcrumb(breadcrumbLinks);
