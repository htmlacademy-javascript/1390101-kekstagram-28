import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';
import { initValidation } from './form.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
initValidation();
