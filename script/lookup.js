// handle layout
const imgLg = document.querySelector(".lookup-bg-lg");
const imgSm = document.querySelector(".lookup-bg-sm");
const container = document.querySelector(".lookup-container");
function adjustSectionHeight() {
  const img = window.innerWidth >= 992 ? imgLg : imgSm;
  if (img.complete) {
    adjustHeight();
  } else {
    img.onload = adjustHeight;
  }
}
function adjustHeight() {
  const img = window.innerWidth >= 992 ? imgLg : imgSm;
  container.style.height = img.offsetHeight + "px";
  container.style.display = "flex";
}

window.addEventListener("load", adjustSectionHeight);
window.addEventListener("resize", adjustSectionHeight);

// handle input
const idInput = document.getElementById("input");
const clearIcon = document.getElementById("clear-icon");

const submitBtn = document.querySelector(".lookup-btn");
const submitBtnDefaultHtml = submitBtn.innerHTML;

idInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  clearIcon.style.display = this.value ? "block" : "none";
});

clearIcon.addEventListener("click", function () {
  idInput.value = "";
  idInput.focus();
  clearIcon.style.display = "none";
});

const listDropdowItem = document.querySelectorAll(".dropdown-item");
const customDropdown = document.getElementById("customDropdown");
const selectedValue = document.getElementById("selected-value");

listDropdowItem.forEach((item, index) => {
  item.addEventListener("click", selectItem);
  if (index === 0) {
    item.click();
  }
});

function selectItem(e) {
  e.preventDefault();

  const selectedText = this.textContent;
  customDropdown.textContent = selectedText;

  const dataValue = this.dataset.value;
  selectedValue.value = dataValue;

  listDropdowItem.forEach((li) => {
    if (li.dataset.value === dataValue) {
      li.setAttribute("selected", true);
    } else {
      li.removeAttribute("selected");
    }
  });
}

// handle form submit
const form = document.getElementById("form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const idNumber = formData.get("id-number");
  const selectedValue = formData.get("selected-value");

  console.log("idNumber:", idNumber);
  console.log("selectedValue:", selectedValue);

  loading();

  setTimeout(fillContent, 2000);
});

const heDaoTao = document.getElementById("he-dao-tao");
const hoVaTen = document.getElementById("ho-va-ten");
const ngaySinh = document.getElementById("ngay-sinh");
const gioiTinh = document.getElementById("gioi-tinh");
const soCccd = document.getElementById("so-cccd");
const diaChi = document.getElementById("dia-chi");
const dienThoai = document.getElementById("dien-thoai");

function loading() {
  [heDaoTao, hoVaTen, ngaySinh, gioiTinh, soCccd, diaChi, dienThoai].forEach(
    (ele) => {
      ele.textContent = "-";
    }
  );

  customDropdown.disabled = true;
  idInput.disabled = true;
  submitBtn.innerHTML = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
`;
}

function fillContent() {
  customDropdown.disabled = false;
  idInput.disabled = false;
  submitBtn.innerHTML = submitBtnDefaultHtml;

  heDaoTao.textContent = "Đại học";
  hoVaTen.textContent = "Trần Quốc Linh Nguyên";
  ngaySinh.textContent = "15/11/2006";
  gioiTinh.textContent = "Nam";
  soCccd.textContent = "022096007556";
  diaChi.textContent =
    "Tòa S2.03, KĐT Vinhomes Smart City, Tổ dân phố số 12, Phường Tây Mỗ, Quận Nam Từ Liêm, Hà Nội";
  dienThoai.textContent = "0908256969";
}
