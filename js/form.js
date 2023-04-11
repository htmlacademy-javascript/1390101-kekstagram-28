import { sendData } from './api.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { uploadFile } from './load-pictures.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const TAG_ERROR_TEXT = 'Неправильно заполнены хештеги';
const MAX_TAGS_COUNT = 5;
const TAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const modalOverlay = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector ('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const commentField = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const uploadSubmit = document.querySelector('.img-upload__submit');
const textDescription = form.querySelector('.text__description');
const previews = document.querySelectorAll('.effects__preview');
const uploadPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  modalOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFile();
};

const closeModal = () => {
  modalOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt) && !document.body.classList.contains('has-message')) {
    evt.preventDefault();
    closeModal();
  }
}

const onUploadFileChange = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadPreview.src = reader.result;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
    showModal();
  }
};

const onCancelButtonClick = () => closeModal();

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

const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  textDescription.readOnly = true;
};

const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  textDescription.readOnly = false;
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(form));
      closeModal();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  }
};

const setupPictureForm = () => {
  pristine.addValidator(
    textHashtags,
    validateTags,
    TAG_ERROR_TEXT
  );

  uploadFileInput.addEventListener('change', onUploadFileChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentField.addEventListener('focus', removeDocumentListener);
  commentField.addEventListener('blur', addDocumentListener);
  textHashtags.addEventListener('focus', removeDocumentListener);
  textHashtags.addEventListener('blur', addDocumentListener);
  form.addEventListener('submit', onFormSubmit);
};

export { setupPictureForm, onDocumentKeydown };
