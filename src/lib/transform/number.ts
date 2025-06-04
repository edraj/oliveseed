
export const toFixed = (n: number, digits: number = 1): string => {
  return n.toFixed(digits);
};


export const percentage = (n: number): string => {
  return n.toFixed(1) + '%';
}
