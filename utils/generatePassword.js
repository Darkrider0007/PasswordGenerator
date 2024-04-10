export function generatePassword(length, isCapital, isNumber, isSpecial) {
  const capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const small = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const special = '!@#$%^&*+?|';

  let password = '';
  while (password.length < length) {
    let random = Math.floor(Math.random() * 4);
    if (random === 0 && isCapital) {
      password += capital[Math.floor(Math.random() * capital.length)];
    } else if (random === 1 && isNumber) {
      password += small[Math.floor(Math.random() * small.length)];
    } else if (random === 2 && isNumber) {
      password += number[Math.floor(Math.random() * number.length)];
    } else if (random === 3 && isSpecial) {
      password += special[Math.floor(Math.random() * special.length)];
    } else {
      password += small[Math.floor(Math.random() * small.length)];
    }
  }

  return password;
}
