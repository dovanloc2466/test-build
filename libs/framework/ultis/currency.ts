export const currency = (param) => {
  if (typeof param === 'number' && !isNaN(param)) {
    const currency = param.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    return currency;
  }
  return null;
};