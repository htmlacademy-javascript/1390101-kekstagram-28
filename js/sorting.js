const PICTURES_COUNT = 10;

const Sorter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFilters = document.querySelector('.img-filters');
let currentSorter = Sorter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getSortedPictures = () => {
  switch (currentSorter) {
    case Sorter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, PICTURES_COUNT);
    case Sorter.DISCUSSED:
      return [...pictures].sort(sortComments);
    default:
      return [...pictures];
  }
};

const setOnSorterClick = (cb) => {
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentSorter) {
      return;
    }

    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentSorter = clickedButton.id;
    cb(getSortedPictures());
  });
};

const init = (loadedPictures, callback) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnSorterClick(callback);
};

export { init, getSortedPictures };
