import { createPhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesSection = document.querySelector('.pictures');
const similarPictures = createPhotos();

const picturesSectionFragment = document.createDocumentFragment();

similarPictures.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').src = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  picturesSection.appendChild(pictureElement);
});

picturesSection.appendChild(picturesSectionFragment);

export {similarPictures};
