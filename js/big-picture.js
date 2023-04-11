import { isEscapeKey } from './util.js';

const PARTITION_SIZE = 5;
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
const showCommentsButton = document.querySelector('.social__comments-loader');
const totalCommentsCount = socialCommentCount.querySelector('.total-comments-count');
const shownCommentsCount = socialCommentCount.querySelector('.shown-comments-count');

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

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

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    const commentCopy = socialComment.cloneNode(true);
    const newPhoto = commentCopy.querySelector('img');
    const newComment = commentCopy.querySelector('.social__text');
    newPhoto.src = comment.avatar;
    newPhoto.alt = comment.name;
    newComment.textContent = comment.message;

    socialComments.appendChild(commentCopy);
  });

  const commentsCountElements = comments.length;
  if (commentsCountElements === 0) {
    socialComments.innerHTML = '';
    socialComments.classList.add('hidden');
    showCommentsButton.classList.add('hidden');
  } else {
    socialCommentCount.classList.remove('hidden');
    showCommentsButton.classList.remove('hidden');
    totalCommentsCount.textContent = totalCommentsCount;
  }

  let shownComments = 0;

  const showCommentsPartition = () => {
    const commentsForShow = comments.slice(shownComments, shownComments + PARTITION_SIZE);
    shownComments += commentsForShow.length;
    shownCommentsCount.textContent = shownComments;
    const fragment = document.createDocumentFragment();
    commentsForShow.forEach((comments) => {
      fragment.append(socialComment);
    });
    socialComments.append(fragment);
    if (shownComments >= totalCommentsCount) {
      showCommentsButton.classList.add('hidden');
      showCommentsButton.removeEventListener('click', showCommentsPartition);
    }
  };

  showCommentsButton.addEventListener('click', showCommentsPartition);
  showCommentsPartition();
};

const renderBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  renderComments(photo.comments);
};

const showBigPicture = (photo) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPicture(photo);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureCancel.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showBigPicture};
