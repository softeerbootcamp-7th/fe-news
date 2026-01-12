import pressData from '../data/pressData.json';

export const TOTAL_PRESS = 96;
export const PER_PAGE = 24;

export const pressLogos = pressData.slice(0, TOTAL_PRESS).map((press) => ({
  id: press.press,
  src: press.logo,
  darkSrc: press.darkLogo,
}));
