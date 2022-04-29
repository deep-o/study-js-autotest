import { el, setAttr } from 'redom';

export function getImg(name) {
  const img = el('img.image');
  const url = './assets/images/';
  setAttr(img, {
    // eslint-disable-next-line no-undef
    src: require(`${url}${name}.png`),
    alt: 'image',
  });

  return img;
}
