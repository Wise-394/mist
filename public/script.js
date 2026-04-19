const openDialogGameBtn = document.querySelector("#openDialogGame");
const gameDialog = document.querySelector("#gameDialog");
const closeDialogGameBtn = document.querySelector("#closeDialogGame");

openDialogGameBtn.addEventListener("click", () => gameDialog.showModal());
closeDialogGameBtn.addEventListener("click", () => gameDialog.close());
