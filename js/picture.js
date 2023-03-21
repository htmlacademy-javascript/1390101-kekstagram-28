import { closeBigPicture, showBigPicture } from './big-picture.js';
import { isEscapeKey } from './util.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesSection = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const picturesSectionFragment = document.createDocumentFragment();

const renderPictures = (photoCollection) => {
  photoCollection.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    picturesSection.appendChild(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(photo);
    });
  });

  picturesSection.appendChild(picturesSectionFragment);

};

bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
});

export {renderPictures};
