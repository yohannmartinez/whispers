/**
 * Enumeration of possible gender options
 */
export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  NON_BINARY: "non_binary",
} as const;

/**
 * Union type derived from GENDERS values, used for strict typing.
 */
export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
