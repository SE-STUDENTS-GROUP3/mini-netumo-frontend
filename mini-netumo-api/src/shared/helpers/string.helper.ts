import { v4 as uuidv4 } from 'uuid';

export class Str {
  static uuid = (): string => uuidv4();

  static slug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  static randomFixedInteger(digits = 10): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static random(length = 10): string {
    const dec2hex = (decimal: number): string => {
      return decimal.toString(16).padStart(2, '0');
    };

    const getRandomValues = (array: Uint8Array): void => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    };

    const arr = new Uint8Array(length / 2);
    getRandomValues(arr);

    return Array.from(arr, dec2hex).join('');
  }

  static generatePassword(passwordLength = 8): string {
    const numberChars = '0123456789';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const allChars = numberChars + upperChars + lowerChars;

    const randPasswordArray = new Array<string>(passwordLength);
    randPasswordArray[0] =
      numberChars[Math.floor(Math.random() * numberChars.length)];
    randPasswordArray[1] =
      upperChars[Math.floor(Math.random() * upperChars.length)];
    randPasswordArray[2] =
      lowerChars[Math.floor(Math.random() * lowerChars.length)];

    for (let i = 3; i < passwordLength; i++) {
      randPasswordArray[i] =
        allChars[Math.floor(Math.random() * allChars.length)];
    }

    return Str.shuffleArray(randPasswordArray).join('');
  }

  static shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
