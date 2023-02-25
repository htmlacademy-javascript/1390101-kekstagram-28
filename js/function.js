// Функция для проверки длины строки

const checkStringLength = (string, maxLength) => string.length >= maxLength;

checkStringLength('кот', 3);

// Функция для проверки, является ли строка палиндромом.

const checkPalindrom = (string) => {
  let newString = string.toLowerCase().replaceAll(' ', '');

  for (let i = string.length; i >= 0; i--) {
    newString += string[i];
  }

  return newString === string;
};

checkPalindrom('Нос');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//  и возвращает их в виде целого положительного числа.

const getNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';

  for (let i = 0; i < string.length; i++) {
    const currentSymbol = parseInt(string[i], 10);
    if (!isNaN(currentSymbol)) {
      result += currentSymbol;
    }
  }

  return parseInt(result, 10);
};

getNumber('2023 год');

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку
// с добавочными символами — и возвращает исходную строку,
// дополненную указанными символами до заданной длины.

const getPadStart = (string, minLength, pad) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }

  return result;
};

getPadStart('1', 2, '0');
