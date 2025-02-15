// admission form
const registerForm = document.querySelector(".register-form form");
const submitBtn = registerForm.querySelector("button[type=submit]");
const inputs = registerForm.querySelectorAll("input:not([type=hidden])");

let isSubmitted = false;
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (!isSubmitted) return;
    validInputClass(this);
    submitBtn.disabled = !registerForm.checkValidity();
  });
});
registerForm.addEventListener("submit", async function (e) {
  isSubmitted = true;
  e.preventDefault();
  inputs.forEach(validInputClass);

  if (!this.checkValidity()) {
    submitBtn.disabled = true;
    return;
  }
  isSubmitted = false;

  const formData = new FormData(this);
  const formValuteIds = [
    "admission-hvt",
    "admission-sdt",
    "admission-email",
    "admission-dc",
    "admission-hdt",
    "admission-nhqt",
  ];
  const [
    admissionHvt,
    admissionSdt,
    admissionEmail,
    admissionDc,
    admissionHdt,
    admissionNhqt,
  ] = formValuteIds.map((id) => formData.get(id));

  console.log(
    admissionHvt,
    admissionSdt,
    admissionEmail,
    admissionDc,
    admissionHdt,
    admissionNhqt
  );
});

function validInputClass(input) {
  const isValid = input.value.trim() && input.checkValidity();
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
}

// selectionion input
const listDropdowItem = registerForm.querySelectorAll(".dropdown-item");

listDropdowItem.forEach((liItem) => {
  liItem.addEventListener("click", selectItem);
  if (liItem.matches(":first-child")) {
    liItem.click();
  }
});

function selectItem() {
  const {
    previousElementSibling: buttonDropdown,
    nextElementSibling: selectInput,
  } = this.parentElement;

  if (buttonDropdown) {
    buttonDropdown.textContent = this.textContent;
  }
  const dataValue = this.dataset.value;
  if (selectInput) {
    selectInput.value = dataValue;
  }
  listDropdowItem.forEach((li) => {
    if (li.dataset.value === dataValue) {
      li.setAttribute("selected", true);
    } else {
      li.removeAttribute("selected");
    }
  });
}
