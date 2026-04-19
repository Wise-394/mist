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
  updateGameBtn.addEventListener('click', () => {
    updateGameDialog.showModal();
  });
}

if (closeUpdateGameBtn) {
  closeUpdateGameBtn.addEventListener('click', () => {
    updateGameDialog.close();
  });
}

if (updateGameDialog && updateGameDialog.dataset.hasErrors === 'true') {
  updateGameDialog.showModal();
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

// --- Add Genre Dialog ---
const addGenreBtn = document.querySelector('#openAddGenreDialog');
const addGenreDialog = document.querySelector('#addGenreDialog');
const closeAddGenreBtn = document.querySelector('#closeAddGenreDialog');
const hasGenreErrors = document.querySelector('#genreErrors');
if (addGenreBtn) {
  addGenreBtn.addEventListener('click', () => addGenreDialog.showModal());
}
if (closeAddGenreBtn) {
  closeAddGenreBtn.addEventListener('click', () => addGenreDialog.close());
}

if (hasGenreErrors.length > 0) {
  document.getElementById('addGenreDialog').showModal();
}

// --- Delete Genre Dialog ---
const deleteGenreBtns = document.querySelectorAll('.delete-genre-btn');
const deleteGenreDialog = document.querySelector('#deleteGenreDialog');
const closeDeleteGenreDialog = document.querySelector(
  '#closeDeleteGenreDialog',
);
const confirmDeleteGenreBtn = document.querySelector('#confirmDeleteGenreBtn');
const genrePasswordInput = document.querySelector('#genre-password');
let selectedGenre = null;

deleteGenreBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedGenre = btn.dataset.id;
    deleteGenreDialog.showModal();
  });
});

if (confirmDeleteGenreBtn) {
  confirmDeleteGenreBtn.addEventListener('click', async () => {
    const password = genrePasswordInput.value;

    const res = await fetch(`/genre/${selectedGenre}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('Incorrect password or delete failed.');
    }
  });
}

if (closeDeleteGenreDialog) {
  closeDeleteGenreDialog.addEventListener('click', () =>
    deleteGenreDialog.close(),
  );
}
