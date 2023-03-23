import { isEscapeKey } from './util.js';

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

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.body.removeEventListener('keydown', bigPictureCancel);
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    const commentCopy = socialComment.cloneNode(true);
    const newPhoto = commentCopy.querySelector('img');
    const newComment = commentCopy.querySelector('.social__text');
    newPhoto.src = comment.avatar;
    newPhoto.alt = comment.name;
    newComment.textContent = comment.massage;

    socialComments.appendChild(commentCopy);
  });
};

const renderBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.lenght;
  socialCaption.textContent = photo.description;
  renderComments(photo.comments);
};

const showBigPicture = (photo) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPicture(photo);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureCancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  });
};


// // Нужно:
//   наполнять его данными:
//   Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
// });

export {showBigPicture, closeBigPicture};
