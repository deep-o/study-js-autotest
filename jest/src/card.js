/* eslint-disable no-unused-expressions */
import { el, setChildren, setStyle } from 'redom';

export default function createCard(createInput) {
  const wrapper = el('div.app__wrap');
  const title = el('h1.mb-3 app__title', 'Payment');
  const paycard = el('div.paycard app__item');
  const form = el('form.form app__item.');
  const types = [
    { name: 'number', placeholder: 'Номер карты' },
    { name: 'email', placeholder: 'email' },
    { name: 'date', placeholder: 'ММ/ГГ' },
    { name: 'code', placeholder: 'CVV/CVC' },
  ];
  const inputs = types.map((type) => createInput(type));
  const logo = el('div.logo');
  setStyle(logo, {
    'background-image': 'url(../assets/brands-logos/visa.png)',
  });

  setChildren(
    paycard,
    el(
      'div.paycard__face paycard__face-front',
      el(
        'div.paycard__wrap',
        el('div.paycard__top'),
        el(
          'div',
          el('span.descr', 'номер карты'),
          el(
            'p.paycard__number',
            { 'data-target': 'number' },
            '####  ####  ####  ####'
          )
        ),
        el(
          'div.paycard__content',
          el(
            'div.content-wrap',
            el('span.descr', 'держатель карты'),
            el('span.paycard__name', { 'data-target': 'holder' }, 'FULL NAME')
          ),
          el(
            'div.content-wrap',
            el('span.descr', 'срок'),
            el('span.paycard__date', { 'data-target': 'date' }, 'MM/YY')
          )
        )
      )
    ),
    el(
      'div.paycard__face paycard__face-back',
      el('div.paycard__band'),
      el(
        'div.paycard__wrap',
        el(
          'div.paycard__cvv',
          el('span.descr', 'CVV'),
          el(
            'div.cvv-band',
            el('div.cvv-band__item cvv-band__signature'),
            el(
              'div.cvv-band__item cvv-band__code cvv-code',
              el('span#cvv', { 'data-target': 'code' }, '***')
            )
          )
        )
      )
    )
  );

  setChildren(
    form,
    { action: '#' },
    el('label.form__label', inputs[0], logo),
    el('label.form__label form__label-half', inputs[2]),
    el('label.form__label form__label-half', inputs[3]),
    el('label.form__label form__label-large', inputs[1]),
    el(
      'button.btn btn-primary',
      { type: 'submit', disabled: 'true' },
      'Оплатить'
    )
  );

  setChildren(wrapper, title, paycard, form);

  paycard.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('flip');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  return wrapper;
}
