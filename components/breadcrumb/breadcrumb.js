export function renderBreadcrumb(customLinks) {
  const breadcrumbContainer = document.getElementById('breadcrumb');
  breadcrumbContainer.innerHTML = '';

  customLinks.forEach((link, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('breadcrumb-item');

    if (link.url && index !== customLinks.length - 1) {
      // Add link nếu không phải là item cuối cùng
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.textContent = link.name;
      anchor.classList.add('breadcrumb-link'); // Thêm class cho các thẻ có link
      listItem.appendChild(anchor);
    } else {
      // Item cuối cùng là active
      listItem.classList.add('active', 'breadcrumb-unlink'); // Thêm class cho thẻ không có link
      listItem.setAttribute('aria-current', 'page');
      listItem.textContent = link.name;
    }

    breadcrumbContainer.appendChild(listItem);
  });
}
