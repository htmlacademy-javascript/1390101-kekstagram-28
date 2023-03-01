// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//  и возвращает их в виде целого положительного числа.

const getNumber = (string) => {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const currentSymbol = parseInt(string[i], 10);
    if (!isNaN(currentSymbol)) {
      result += String(currentSymbol);
    }
  }

  return parseInt(result, 10);
};

getNumber('2023 год');

const ID_PHOTO = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

const DESCRIPTION_PHOTO =[
  'Смотрите, как высоко!',
  'Без фильтров',
  'Тут все, Никита, Стас, Гена, Турбо и Дюша Метёлкин',
  '',
  '',
  '',
  '',
  ''
]
