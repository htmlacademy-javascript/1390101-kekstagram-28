
const bigPicture = document.querySelector('.big-picture');
const renderBigPicture = (photo) => {}
const showBigPicture = () => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');


};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

// // Нужно:
//   наполнять его данными:
//   Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
// });

export {showBigPicture, closeBigPicture};
