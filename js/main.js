import { createPhotos } from './data.js';
import { renderPictures } from './picture.js';
import { setOnFormSubmit, setupPictureForm } from './form.js';
import { initScale } from './scale.js';
import { initPictureEffects } from './effects.js';
import { getData, sendData } from './api.js';
import { showSuccesMessage, showErrorMessage } from './message.js';
import { showAlert } from './util.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
setupPictureForm();
initScale();
initPictureEffects();

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    setupPictureForm();
    showSuccesMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderPictures(data);
} catch (err) {
  showAlert(err.message);
}
