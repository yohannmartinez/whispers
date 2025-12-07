/**
 * Capitalizes the first character of a string.
 *
 * - Returns an empty string if the input is falsy or empty.
 * - Leaves the rest of the string unchanged.
 *
 * @param str - input string
 * @returns string with the first character capitalized
 */
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
