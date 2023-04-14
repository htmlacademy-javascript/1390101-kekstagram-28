import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let currentCount = COMMENTS_STEP;
let currentsCount = [];

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  currentCount = COMMENTS_STEP;

  commentsLoader.removeEventListener('click', onLoadCommentsButtonClick);
  bigPictureCancel.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick() {
  closeBigPicture();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const renderComments = () => {
  socialComments.innerHTML = '';

  currentCount = Math.min(currentCount, currentsCount.length);

  const comments = currentsCount.slice(0, currentCount);

  if (currentsCount.length <= COMMENTS_STEP || currentCount >= currentsCount.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentCount.innerHTML = `${currentCount} из <span class="comments-count">
  ${currentsCount.length}</span> комментариев`;

  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentCopy = socialComment.cloneNode(true);
    const newPhoto = commentCopy.querySelector('img');
    const newComment = commentCopy.querySelector('.social__text');
    newPhoto.src = comment.avatar;
    newPhoto.alt = comment.name;
    newComment.textContent = comment.message;

    commentFragment.appendChild(commentCopy);
  });

  socialComments.appendChild(commentFragment);
};

function onLoadCommentsButtonClick() {
  currentCount += COMMENTS_STEP;
  renderComments();
}

const renderBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
};

const showBigPicture = (photo) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPicture(photo);
  currentsCount = photo.comments;
  renderComments();

  commentsLoader.addEventListener('click', onLoadCommentsButtonClick);
  bigPictureCancel.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPicture };
