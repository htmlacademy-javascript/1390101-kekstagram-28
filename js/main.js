const PHOTO_OBJECT = 25;
const AVATAR_NUMBER = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_PHOTO = 15;
const NAMES = ['Саша', 'Петя', 'Вася', 'Мальвина', 'Маша', 'Круэлла', 'Урсула', 'Квазимода'];

const MASSAGE_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS_PHOTO = [
  'Смотрите, как высоко!',
  'Без фильтров',
  'Тут все, Никита, Стас, Гена, Турбо и Дюша Метёлкин',
  'Снято на айфон 4',
  'Описание к фото',
  'В Питере как всегда, солнечно весь день!',
  'Всё путём, а у вас?'
];

// создает целое рандомное число
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// берет рандомный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// генерирует ID
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const сreatePhoto = () => {
  return {
    id: generatePhotoId(getRandomInteger(PHOTO_OBJECT)),
    description: getRandomArrayElement(DESCRIPTIONS_PHOTO)
  }
}
console.log(сreatePhoto());
