document.addEventListener('DOMContentLoaded', () => {
  const addGameBtn = document.querySelector('#openDialogGame');
  const addGameDialog = document.querySelector('#gameDialog');
  const closeAddGameBtn = document.querySelector('#closeDialogGame');

  if (addGameBtn && addGameDialog) {
    addGameBtn.addEventListener('click', () => addGameDialog.showModal());
  }
  if (closeAddGameBtn && addGameDialog) {
    closeAddGameBtn.addEventListener('click', () => addGameDialog.close());
  }

  if (addGameDialog && addGameDialog.dataset.hasErrors === 'true') {
    addGameDialog.showModal();
  }

  const updateGameBtn = document.querySelector('#openUpdateDialog');
  const updateGameDialog = document.querySelector('#updateGameDialog');
  const closeUpdateGameBtn = document.querySelector('#closeUpdateDialog');

  if (updateGameBtn && updateGameDialog) {
    updateGameBtn.addEventListener('click', () => updateGameDialog.showModal());
  }
  if (closeUpdateGameBtn && updateGameDialog) {
    closeUpdateGameBtn.addEventListener('click', () =>
      updateGameDialog.close(),
    );
  }

  if (updateGameDialog && updateGameDialog.dataset.hasErrors === 'true') {
    updateGameDialog.showModal();
  }

  const deleteGameBtn = document.querySelector('#openGameDeleteDialog');
  const deleteGameDialog = document.querySelector('#deleteGameDialog');
  const closeDeleteGameBtn = document.querySelector('#closeGameDeleteDialog');
  const confirmDeleteBtn = document.querySelector('#confirmDeleteBtn');
  const passwordInput = document.querySelector('#game-password');

  if (deleteGameBtn && deleteGameDialog) {
    deleteGameBtn.addEventListener('click', () => deleteGameDialog.showModal());
  }
  if (closeDeleteGameBtn && deleteGameDialog) {
    closeDeleteGameBtn.addEventListener('click', () => {
      deleteGameDialog.close();
      if (passwordInput) passwordInput.value = '';
    });
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

  const addGenreBtn = document.querySelector('#openAddGenreDialog');
  const addGenreDialog = document.querySelector('#addGenreDialog');
  const closeAddGenreBtn = document.querySelector('#closeAddGenreDialog');
  const genreErrorsElem = document.querySelector('#genreErrors');

  if (addGenreBtn && addGenreDialog) {
    addGenreBtn.addEventListener('click', () => addGenreDialog.showModal());
  }
  if (closeAddGenreBtn && addGenreDialog) {
    closeAddGenreBtn.addEventListener('click', () => addGenreDialog.close());
  }

  if (
    addGenreDialog &&
    genreErrorsElem &&
    genreErrorsElem.children.length > 0
  ) {
    addGenreDialog.showModal();
  }

  const deleteGenreBtns = document.querySelectorAll('.delete-genre-btn');
  const deleteGenreDialog = document.querySelector('#deleteGenreDialog');
  const closeDeleteGenreDialog = document.querySelector(
    '#closeDeleteGenreDialog',
  );
  const confirmDeleteGenreBtn = document.querySelector(
    '#confirmDeleteGenreBtn',
  );
  const genrePasswordInput = document.querySelector('#genre-password');
  let selectedGenreId = null;

  deleteGenreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedGenreId = btn.dataset.id;
      deleteGenreDialog.showModal();
    });
  });

  if (confirmDeleteGenreBtn) {
    confirmDeleteGenreBtn.addEventListener('click', async () => {
      const password = genrePasswordInput.value;
      if (!selectedGenreId) return;

      const res = await fetch(`/genre/${selectedGenreId}`, {
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

  if (closeDeleteGenreDialog && deleteGenreDialog) {
    closeDeleteGenreDialog.addEventListener('click', () => {
      deleteGenreDialog.close();
      if (genrePasswordInput) genrePasswordInput.value = '';
    });
  }
});
