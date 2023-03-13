import { createPhotos } from './data.js';
import {renderPictures} from './picture.js';

const photoCollection = createPhotos();

renderPictures(photoCollection);
