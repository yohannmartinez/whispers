/**
 * Enumeration of possible gender options
 */
export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
} as const;

/**
 * Union type derived from GENDERS values, used for strict typing.
 */
export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
