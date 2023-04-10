import { renderPictures } from './picture.js';
import { setupPictureForm } from './form.js';
import { initScale } from './scale.js';
import { initPictureEffects } from './effects.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';
import { init, getSortedPictures } from './sorting.js';

setupPictureForm();
initScale();
initPictureEffects();

try {
  const data = await getData();
  const debouncedRenderPictures = debounce(renderPictures);
  init(data, debouncedRenderPictures);
  renderPictures(getSortedPictures());
} catch (err) {
  showAlert(err.message);
}
