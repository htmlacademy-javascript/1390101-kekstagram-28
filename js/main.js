import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';
import { initValidation } from './form.js';
import {downloadScale} from './scale.js';
import { resetEffects } from './effects.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
initValidation();
downloadScale();
resetEffects();
