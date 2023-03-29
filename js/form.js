import { isEscapeKey } from './util.js';

const TAG_ERROR_TEXT = 'Неправильно заполнены хештеги';
const MAX_HESHTEGS_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const modalOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector ('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__form-wrapper',
  errorTextParent: 'img-upload__form-element',
  errorTextClass: 'img-upload__form-error'
});

const onShowModal = () => {
  modalOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseModal = () => {
  modalOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  form.reset();
  pristine.reset();
};

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModal();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

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
const isValidTegs = (tag) => hashtag.test(tag);
const hashValidCount = (tags) => tags.length <= MAX_HESHTEGS_COUNT;

const hashUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set (lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);

  return hashValidCount(tags) && hashUniqueTags(tags) && tags.every(isValidTegs);
};

pristine.addValidator(
  textHashtags,
  validateTags,
  TAG_ERROR_TEXT
);

uploadFile.addEventListener('change', onShowModal);
cancelButton.addEventListener('click', onCloseModal);
form.addEventListener('submit', onFormSubmit);
