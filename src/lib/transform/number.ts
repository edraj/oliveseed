import { Res } from '$src/utils/resources';

export const toFixed = (n: number, digits: number = 1): string => {
  return n.toFixed(digits);
};


export const percentage = (n: number): string => {
  return n.toFixed(1) + '%';
};


export const prettyPrice = (n: number): string => {
  return Intl.NumberFormat(Res.language, { currency: 'IQD', style: 'currency' }).format(n);
};
export const prettyNumber = (n: number): string => {
  return Intl.NumberFormat(Res.language).format(n);
};
