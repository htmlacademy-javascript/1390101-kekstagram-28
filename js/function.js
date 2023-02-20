// Функция для проверки длины строки

const searchStringValidation = (test, number) => {
  const lenght = test.length >= number;
  return lenght;
};

searchStringValidation('кот', 3);

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
  let number = '';
  for (let i = 0; i < string.length; i++) {
    const currentSymbol = parseInt(string[i], 10);
    if (!isNaN(currentSymbol)) {
      number += currentSymbol;
    }
  }
  return parseInt(number, 10);
};

getNumber('2023 год');
