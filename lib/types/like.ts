/**
 * Like type definition representing a like interaction between profiles.
 */
export type Like = {
  /**
   * Unique identifier for the like interaction
   */
  id: string;
  /**
   * Identifier of the profile that initiated the like
   */
  fromProfileId: string;
  /**
   * Identifier of the profile that received the like
   */
  toProfileId: string;
  /**
   * Timestamp when the like interaction was created
   */
  createdAt: string;
  /**
   * Status of the like interaction
   */
  likeStatus: LikeStatus;
  /**
   * Indicates if the like is special
   */
  isSpecial: boolean;
  /**
   * Optional message associated with the like
   */
  message?: string;
};

/**
 * Enumeration of possible like status options
 */
export const LIKE_STATUS = {
  PENDING: "pending",
  SEEN: "seen",
  CANCELED: "canceled",
} as const;

/**
 * Union type derived from LIKE_STATUS values, used for strict typing.
 */
export type LikeStatus = (typeof LIKE_STATUS)[keyof typeof LIKE_STATUS];
