const openDialogGameBtn = document.querySelector('#openDialogGame');
const gameDialog = document.querySelector('#gameDialog');
const closeDialogGameBtn = document.querySelector('#closeDialogGame');

if (openDialogGameBtn) {
  openDialogGameBtn.addEventListener('click', () => gameDialog.showModal());
}
if (closeDialogGameBtn) {
  closeDialogGameBtn.addEventListener('click', () => gameDialog.close());
}

const openUpdateDialogBtn = document.querySelector('#openUpdateDialog');
const updateGameDialog = document.querySelector('#updateGameDialog');
const closeUpdateDialogBtn = document.querySelector('#closeUpdateDialog');

if (openUpdateDialogBtn) {
  openUpdateDialogBtn.addEventListener('click', () =>
    updateGameDialog.showModal(),
  );
}
if (closeUpdateDialogBtn) {
  closeUpdateDialogBtn.addEventListener('click', () =>
    updateGameDialog.close(),
  );
}
