import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';
import { setupPictureForm } from './form.js';
import { initScale } from './scale.js';
import { initPictureEffects } from './effects.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
setupPictureForm();
initScale();
initPictureEffects();
