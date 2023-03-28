import { isEscapeKey } from './util.js';

const modalOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector ('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');

const onShowModal = () => {
  modalOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseModal = () => {
  modalOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModal();
  }
}

uploadFile.addEventListener('change', onShowModal);
cancelButton.addEventListener('click', onCloseModal);

commentField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

commentField.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});
