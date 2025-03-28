import { renderBreadcrumb } from "../components/breadcrumb/breadcrumb.js";

const breadcrumbLinks = [
  { name: "Thông tin giảng viên", url: "home.html" },
  { name: "Khoa Công nghệ thông tin ", url: "home.html" },
  { name: "Trần Đăng Công", url: null }, // Active page (không có link)
];

renderBreadcrumb(breadcrumbLinks);
