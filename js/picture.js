const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesSection = document.querySelector('.pictures');

const picturesSectionFragment = document.createDocumentFragment();

const renderPictures = (photoCollection) => {
  photoCollection.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    picturesSection.appendChild(pictureElement);
  });

  picturesSection.appendChild(picturesSectionFragment);

};

export {renderPictures};
