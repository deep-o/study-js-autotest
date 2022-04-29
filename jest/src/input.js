import { el } from 'redom';
import { getImg } from './img';
import Inputmask from 'inputmask';
import CardInfo from 'card-info';
import { isValid, isExpirationDateValid } from 'creditcard.js';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isLength from 'validator/lib/isLength';

function maskInput(input) {
  const type = input.dataset.path;
  let im;

  switch (type) {
    case 'number':
      im = new Inputmask('9999 9999 9999 9999 9999', { placeholder: '' });
      break;
    case 'email':
      im = new Inputmask({ alias: 'email' });
      break;
    case 'date':
      im = new Inputmask('99/99', { placeholder: '*' });
      break;
    case 'code':
      im = new Inputmask('999', { placeholder: '*' });
      break;
    default:
      break;
  }

  im ? im.mask(input) : null;
}

function addLogo(value) {
  console.log(value);
  const elem = document.querySelector('.logo');
  if (elem) {
    elem.innerHTML = '';
    elem.append(getImg(value));
  }
}

export function validateData(type, value) {
  let checkedValue = false;
  let typeCard;
  let cardInfo;

  switch (type) {
    case 'number':
      checkedValue = isValid(value);
      cardInfo = new CardInfo(value);
      typeCard = cardInfo.brandAlias;
      addLogo(typeCard);
      break;
    case 'email':
      checkedValue = isEmail(value);
      break;
    case 'date':
      checkedValue = isExpirationDateValid(
        value.split('/')[0],
        value.split('/')[1]
      );
      break;
    case 'code':
      checkedValue = isNumeric(value) && isLength(value, { min: 3, max: 3 });
      break;
    default:
      break;
  }
  return checkedValue;
}

function checkForm() {
  const inputs = document.querySelectorAll('.is-valid');
  const btn = document.querySelector('.btn');
  const result = inputs.length === 4;

  if (result) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'true');
  }

  return result;
}

export function createInput(type) {
  const input = el('input.form-control', {
    type: 'text',
    'data-path': type.name,
    placeholder: type.placeholder,
  });
  maskInput(input);

  input.addEventListener('blur', (e) => {
    input.classList.remove('is-valid');
    const { value } = e.currentTarget;

    if (value === '') return;

    const check = validateData(type.name, value);

    if (check) {
      const target = document.querySelector(`[data-target=${type.name}]`);
      target ? (target.textContent = e.target.value) : null;
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-invalid');
    }
    checkForm();
  });

  input.addEventListener('click', () => {
    input.classList.remove('is-invalid');
    const target = document.querySelector('.paycard');
    type.name === 'code'
      ? target.classList.add('flip')
      : target.classList.remove('flip');
  });

  return input;
}
