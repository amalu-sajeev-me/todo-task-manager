import { unknown } from "zod";

export const truncate = (str: string): string => {
  const stringToParse = str.length > 32 ? str.slice(0, 32) : str;
  return `${stringToParse}...`;
};

export const omitFunctionsInObj = <TObj = Record<string, unknown>>(
  obj: TObj
) => {
  const result = { ...obj } as { [key: string]: any };
  Object.keys(result).forEach((key) => {
    if (typeof result[key] === "function") delete result[key];
  });
  return { ...result };
};
