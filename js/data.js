import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTO_COUNT = 25;
const NAMES = ['Саша', 'Петя', 'Вася', 'Мальвина', 'Маша', 'Круэлла', 'Урсула', 'Квазимода'];

const MESSAGE_COMMENT = [
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

// генерирует ID
function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator();

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  massage: getRandomArrayElement(MESSAGE_COMMENT),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => {
  const data = [];
  const commentCount = getRandomInteger(2, 5);

  for (let i = 0; i < commentCount; i++) {
    data.push(createComment());
  }

  return data;
};

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

const createPhotos = () => {
  const data = [];

  for (let i = 0; i < PHOTO_COUNT; i++) {
    data.push(createPhoto());
  }

  return data;
};

export {createPhotos};
