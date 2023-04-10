import { renderPictures } from './picture.js';
import { setupPictureForm } from './form.js';
import { initScale } from './scale.js';
import { initPictureEffects } from './effects.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initFilters } from './filters.js';

setupPictureForm();
initScale();
initPictureEffects();

try {
  const data = await getData();
  initFilters(data);
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}
