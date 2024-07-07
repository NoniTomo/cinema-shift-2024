import { KeyboardEvent } from "react";

export const filterInputOnlyNumbers = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape'
  ];

  if (!(/[0-9]/.test(e.key) || allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)) {
    e.preventDefault();
  }
};

export const filterInputAlphabet = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape', ' ', '-', '`', '‘', 'ё', 'Ё'
  ];

  if (!(/[a-zA-Zа-яА-Я]/.test(e.key) || allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)) {
    e.preventDefault();
  }
};


export const filterInputEmail = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedSpecialChars = "@.!$&*=^`'|~#%'`+/?_{ }";
  const allowedKeys = [
    'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape', '-', ' '
  ];

  if (!(
      /[a-zA-Zа-яА-ЯёЁ0-9]/.test(e.key) || 
      allowedSpecialChars.includes(e.key) || 
      allowedKeys.includes(e.key) || 
      e.ctrlKey || e.metaKey
    )) {
    e.preventDefault();
  }
};

export const filterInputCity = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape', ' ', '-', '.', 'ё', 'Ё'
  ];

  if (!(/[a-zA-Z0-9а-яА-Я]/.test(e.key) || allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)) {
    e.preventDefault();
  }
};

const cyrillicRegex = /^[а-яА-ЯёЁ\s`-]+$/;
const latinRegex = /^[a-zA-Z\s`-]+$/;
const specialCharRegexEndBeginTest = /^(?![`-])(?!.*[`-]$).*$/;
const specialCharRegexRepeatTest = /^(?!.*[`].*[`])(?!.*[-].*[-]).*$/;
const emailRegex = /\S+@\S+\.[.a-zA-Z]{2,}$/;

export const validateAlphabetAndSpecialSymbols = (value: string) => {
  if ((cyrillicRegex.test(value) || latinRegex.test(value)) && specialCharRegexEndBeginTest.test(value) && specialCharRegexRepeatTest.test(value)) {
    return true;
  }
  return 'Некорректный формат';
};

export const validateEmail = (value: string) => {
  if ((emailRegex.test(value) || latinRegex.test(value)) && specialCharRegexEndBeginTest.test(value) && specialCharRegexRepeatTest.test(value)) {
    return true;
  }
  return 'Некорректный формат почты';
};