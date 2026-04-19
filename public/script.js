// --- Add Game Dialog ---
const addGameBtn = document.querySelector('#openDialogGame');
const addGameDialog = document.querySelector('#gameDialog');
const closeAddGameBtn = document.querySelector('#closeDialogGame');

if (addGameBtn) {
  addGameBtn.addEventListener('click', () => addGameDialog.showModal());
}
if (closeAddGameBtn) {
  closeAddGameBtn.addEventListener('click', () => addGameDialog.close());
}

// --- Update Game Dialog ---
const updateGameBtn = document.querySelector('#openUpdateDialog');
const updateGameDialog = document.querySelector('#updateGameDialog');
const closeUpdateGameBtn = document.querySelector('#closeUpdateDialog');

if (updateGameBtn) {
  updateGameBtn.addEventListener('click', () => updateGameDialog.showModal());
}
if (closeUpdateGameBtn) {
  closeUpdateGameBtn.addEventListener('click', () => updateGameDialog.close());
}

// --- Delete Game Dialog ---
const deleteGameBtn = document.querySelector('#openGameDeleteDialog');
const deleteGameDialog = document.querySelector('#deleteGameDialog');
const closeDeleteGameBtn = document.querySelector('#closeGameDeleteDialog');
const confirmDeleteBtn = document.querySelector('#confirmDeleteBtn');
const passwordInput = document.querySelector('#game-password');

if (deleteGameBtn) {
  deleteGameBtn.addEventListener('click', () => deleteGameDialog.showModal());
}
if (closeDeleteGameBtn) {
  closeDeleteGameBtn.addEventListener('click', () => deleteGameDialog.close());
}
if (confirmDeleteBtn) {
  confirmDeleteBtn.addEventListener('click', async () => {
    const gameId = deleteGameBtn.dataset.id;
    const password = passwordInput.value;

    const res = await fetch(`/game/${gameId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = '/';
    } else {
      alert('Incorrect password or delete failed.');
    }
  });
}
