export const truncate = (str: string): string => {
  const stringToParse = str.length > 32 ? str.slice(0, 32) : str;
  return `${stringToParse}...`;
};
