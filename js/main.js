import { renderPictures } from './picture.js';
import { setupPictureForm } from './form.js';
import { initScale } from './scale.js';
import { initPictureEffects } from './effects.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

setupPictureForm();
initScale();
initPictureEffects();

try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}
