/**
 * Match type definition representing a match interaction between two profiles.
 */
export type Match = {
  /**
   * Unique identifier for the match interaction
   */
  id: string;
  /**
   * Identifier of the first profile in the match
   */
  profileAId: string;
  /**
   * Identifier of the second profile in the match
   */
  profileBId: string;
  /**
   * Timestamp when the match interaction was created
   */
  createdAt: string;
};
