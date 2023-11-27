// Change products status
const changeStatusButtons = document.querySelectorAll('[change-status-button]');
if (changeStatusButtons.length > 0) {
  changeStatusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const formChangeStatus = document.querySelector("#form-change-status");
      const path = formChangeStatus.getAttribute("data-path");

      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const newStatus = currentStatus == 'active' ? 'inactive' : 'active';
      const newAction = path + `/${newStatus}/${id}?_method=PATCH`;

      formChangeStatus.action = newAction;
      formChangeStatus.submit();
    })
  })
}