/**
 * Enumeration of possible relation type options
 */
export const RELATION_TYPES = {
  SERIOUS: "serious",
  CASUAL: "casual",
} as const;

/**
 * Union type derived from RELATION_TYPES values, used for strict typing.
 */
export type RelationType = (typeof RELATION_TYPES)[keyof typeof RELATION_TYPES];
