const modalOverlay = document.querySelector('.img-upload__overlay');

const showModal = () => {
  modalOverlay.classList.remove('hidden');
};

const onFileInputChange = () => {
  showModal();
};

fileFiled.addEventListener('change', onFileInputChange);
