import { resetEffects } from './effects.js';
import { downloadScale } from './scale.js';
import { isEscapeKey } from './util.js';

const TAG_ERROR_TEXT = 'Неправильно заполнены хештеги';
const MAX_TAGS_COUNT = 5;
const TAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const modalOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector ('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const commentField = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const onShowModal = () => {
  modalOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseModal = () => {
  modalOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  form.reset();
  pristine.reset();
  downloadScale();
  resetEffects();
  downloadScale();
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

const removeDocumentListener = () => document.removeEventListener('keydown', onDocumentKeydown);
const addDocumentListener = () => document.addEventListener('keydown', onDocumentKeydown);

const isValidTeg = (tag) => TAG_REGEXP.test(tag);
const hashValidCount = (tags) => tags.length <= MAX_TAGS_COUNT;

const hashUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);

  return hashValidCount(tags) && hashUniqueTags(tags) && tags.every(isValidTeg);
};

const initValidation = () => {
  pristine.addValidator(
    textHashtags,
    validateTags,
    TAG_ERROR_TEXT
  );

  uploadFile.addEventListener('change', onShowModal);
  cancelButton.addEventListener('click', onCloseModal);
  form.addEventListener('submit', onFormSubmit);
  commentField.addEventListener('focus', removeDocumentListener);
  commentField.addEventListener('blur', addDocumentListener);
  textHashtags.addEventListener('focus', removeDocumentListener);
  textHashtags.addEventListener('blur', addDocumentListener);
};

export { initValidation };
