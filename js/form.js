import { isEscapeKey } from './util.js';

const TAG_ERROR_TEXT = 'Неправильно заполнены хештеги';

const form = document.querySelector('.img-upload__form');
const modalOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector ('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');


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

textHashtags.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

textHashtags.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__form-wrapper',
  errorTextParent: 'img-upload__form-element',
  errorTextClass: 'img-upload__form-error'
});

pristine.addValidator(
  textHashtags,
  hashtag,
  TAG_ERROR_TEXT
);
