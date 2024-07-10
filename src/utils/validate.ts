import { ClipboardEvent, KeyboardEvent } from 'react';

function testClipboardEvent(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
): asserts e is ClipboardEvent<HTMLInputElement> {
  if (!Object.prototype.hasOwnProperty.call(e, 'clipboardData'))
    throw new Error('The ClipboardEvent type was expected for the event');
}
function testKeyboardEvent(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
): asserts e is KeyboardEvent<HTMLInputElement> {
  if (Object.prototype.hasOwnProperty.call(e, 'clipboardData'))
    throw new Error('The testKeyboardEvent type was expected for the event');
}

const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape'];

const check = (
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
  testRegex: RegExp
) => {
  if (Object.prototype.hasOwnProperty.call(e, 'clipboardData')) {
    testClipboardEvent(e);
    console.log(testRegex);
    console.log(e.clipboardData.getData('text').split(''));
    if (
      !e.clipboardData
        .getData('text')
        .split('')
        .reduce((res, symbol) => res && testRegex.test(symbol), true)
    ) {
      e.preventDefault();
    }
  } else {
    testKeyboardEvent(e);
    console.log('testRegex = ', testRegex);
    console.log('testRegex.test(e.key) = ', testRegex.test(e.key));
    console.log('e.key = ', e.key);
    if (!(testRegex.test(e.key) || allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    }
  }
};

export const filterInputOnlyNumbers = (
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
) => {
  const testRegex = /[0-9]/;

  check(e, testRegex);
};

export const filterInputAlphabet = (
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
) => {
  const testRegex = /[a-zA-Zа-яА-ЯёЁ‘`-\s]/;

  check(e, testRegex);
};

export const filterInputEmail = (
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
) => {
  //const allowedSpecialChars = "@.!$&*=^`'|~#%'`+/?_{ }-\S"
  const testRegex = /[a-zA-Zа-яА-ЯёЁ0-9@.!$&*=^`'|~#%'`+/?_{ }-\S]/;

  check(e, testRegex);
};

export const filterInputCity = (
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>
) => {
  const testRegex = /[a-zA-Z0-9а-яА-ЯёЁ.-\S]/;

  check(e, testRegex);
};

const cyrillicRegex = /^[а-яА-ЯёЁ\s`-]+$/;
const latinRegex = /^[a-zA-Z\s`-]+$/;
const specialCharRegexEndBeginTest = /^(?![`-])(?!.*[`-]$).*$/;
const specialCharRegexRepeatTest = /^(?!.*[`].*[`])(?!.*[-].*[-]).*$/;
const emailRegex = /\S+@\S+\.[.a-zA-Z]{2,}$/;

export const validateAlphabetAndSpecialSymbols = (value: string) => {
  if (
    (cyrillicRegex.test(value) || latinRegex.test(value)) &&
    specialCharRegexEndBeginTest.test(value) &&
    specialCharRegexRepeatTest.test(value)
  ) {
    return true;
  }
  return 'Некорректный формат';
};

export const validateEmail = (value: string) => {
  console.log('emailRegex = ', emailRegex);
  console.log(
    '(emailRegex.test(value) && latinRegex.test(value)) = ',
    emailRegex.test(value) && latinRegex.test(value)
  );
  console.log('value = ', value);
  if (
    emailRegex.test(value) &&
    specialCharRegexEndBeginTest.test(value) &&
    specialCharRegexRepeatTest.test(value)
  ) {
    return true;
  }
  return 'Некорректный формат почты';
};

export const validateMonth = (value: string) => {
  if (
    +value % 100 <= 12 &&
    +value - (+value % 100) / 100 <= 99 &&
    +value - (+value % 100) / 100 <= 19
  ) {
    return true;
  }
  return 'Некорректный срок действия';
};
