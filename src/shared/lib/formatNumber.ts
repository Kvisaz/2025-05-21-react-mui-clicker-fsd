const SI_PREFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toFixed(1).replace(/\.0$/, '');
  }

  const exp = Math.min(
    Math.floor(Math.log10(Math.abs(num)) / 3),
    SI_PREFIXES.length - 1
  );
  const scaled = num / Math.pow(1000, exp);
  const prefix = SI_PREFIXES[exp];

  return scaled.toFixed(1).replace(/\.0$/, '') + prefix;
}; 