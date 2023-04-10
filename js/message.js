import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const getMessage = () => document.querySelector('.error, .success');

const closeMessage = () => {
  const message = getMessage();
  if (message) {
    message.remove();
  }

  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onMessageKeydown);
  document.body.classList.remove('has-message');
};

const showErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  document.body.append(error);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.body.classList.add('has-message');
};

const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  document.body.append(success);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.body.classList.add('has-message');
};

function onMessageKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onOutsideClick (evt) {
  const message = getMessage();
  if (evt.target === message) {
    closeMessage();
  }
}

export { showSuccessMessage, showErrorMessage };
