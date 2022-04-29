import { validateData } from './input';
import { createInput } from './input';
import { default as createCard } from './card';

describe('валидация создания формы для заполнения банковской карты', () => {
  describe('валидация номера карты', () => {
    test('пропускает валидный номер', () => {
      expect(validateData('number', '4111111111111111')).toBe(true);
    });

    test('не пропускает произвольную строку', () => {
      expect(validateData('number', '4111fr11пра.,11111')).toBe(false);
    });

    test('не пропускает строку с недостаточным количеством цифр', () => {
      expect(validateData('number', '41111111111111')).toBe(false);
    });

    test('не пропускает строку со слишком большим количеством цифр', () => {
      expect(validateData('number', '41111111111111111111111')).toBe(false);
    });
  });

  describe('валидация CVV', () => {
    test('пропускает строку с тремя цифровыми символами', () => {
      expect(validateData('code', '123')).toBe(true);
    });

    test('не пропускает строку с 1-2 цифровыми символами', () => {
      expect(validateData('code', '12')).toBe(false);
    });

    test('не пропускает строку с 4+ цифровыми символами', () => {
      expect(validateData('code', '1234')).toBe(false);
    });

    test('не пропускает строку с 3мя нецифровыми символами', () => {
      expect(validateData('code', 'adf')).toBe(false);
    });
  });

  describe('создание DOM элемента', () => {
    test('в форме создаётся 4 поля ввода', () => {
      const inputs = jest.fn();
      createCard(inputs);
      expect(inputs).toHaveBeenCalledTimes(4);
    });

    const card = createCard(createInput);

    test('создаётся поле для ввода номера карты', () => {
      expect(card.outerHTML).toContain('placeholder="Номер карты"');
    });

    test('создаётся поле для ввода срока действия карты формата ММ/ГГ', () => {
      expect(card.outerHTML).toContain('placeholder="ММ/ГГ"');
    });

    test('создаётся поле для ввода кода CVV/CVC', () => {
      expect(card.outerHTML).toContain('placeholder="CVV/CVC"');
    });

    test('создаётся поле для ввода email', () => {
      expect(card.outerHTML).toContain('placeholder="email"');
    });
  });
});
