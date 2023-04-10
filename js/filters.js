import { renderPictures } from './picture.js';
import { debounce } from './util.js';

const PICTURES_COUNT = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__form button');

const deletePictures = () => {
  document.querySelectorAll('.picture').forEach((pictureElement) => pictureElement.remove());
};

const getFilteredPictures = (pictures, currentSorter) => {
  switch (currentSorter) {
    case FilterType.RANDOM:
      return [...pictures].sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT);
    case FilterType.DISCUSSED:
      return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
    case FilterType.DEFAULT:
      return pictures;
    default:
      throw new Error(`Unknown current sort: ${currentSorter}`);
  }
};

const onFilterFormClick = (evt, loadedPictures) => {
  if (!evt.target.classList.contains('img-filters__button') || evt.target.classList.contains('img-filters__button--active')) {
    return;
  }
  const clickedButton = evt.target;
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  clickedButton.classList.add('img-filters__button--active');
  const filteredPictures = getFilteredPictures(loadedPictures, clickedButton.id);
  deletePictures();
  renderPictures(filteredPictures);
};

const initFilters = (loadedPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', debounce((evt) => onFilterFormClick(evt, loadedPictures)));
};

export { initFilters };
