export const getRuDeclination = (
  number: number,
  words: { one: string; few: string; many: string }
) => {
  const n = Math.abs(number);
  if (n % 10 === 1 && n % 100 != 11) return words.one;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return words.few;
  return words.many;
};
