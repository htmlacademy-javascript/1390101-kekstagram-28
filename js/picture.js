import { createPhotos } from "./data.js";

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesSection = document.querySelector('.pictures');
const pictureElement = pictureTemplate.cloneNode(true);

picturesSection.appendChild(pictureElement);

similarPictures = createPhotos();

similarPictures.forEach(() => {


});
