import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';
import './form.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
