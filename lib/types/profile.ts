import { Gender } from "./gender";
import { RelationType } from "./relationType";

/**
 * Profile type definition representing user profile information.
 */
export type Profile = {
  /**
   * Unique identifier for the profile
   */
  id: string;
  /**
   * First name of the user
   */
  firstname: string;
  /**
   * Last name of the user
   */
  lastname: string;
  /**
   * Bio or description provided by the user
   */
  bio: string;
  /**
   * Date of birth in timestamp format
   */
  birthdate?: string;
  /**
   * Gender of the user
   */
  gender?: Gender;
  /**
   * Email address associated with the profile
   */
  email: string;
  /**
   * Timestamp when the profile was created
   */
  created_at: string;
  /**
   * Timestamp when the profile was updated
   */
  updated_at: string;
  /**
   * Indicates if the profile is in incognito mode
   */
  isIncognito: boolean;
  /**
   * Timestamp of the last activity of the user
   */
  lastActiveAt: string;
  /**
   * Indicates if the user has completed the onboarding process
   */
  isUnboarded: boolean;
};

/**
 * ProfilePreferences type definition representing user profile preferences.
 */
export type ProfilePreferences = {
  /**
   * Unique identifier for the profile preferences
   */
  profileId: string;
  /**
   * Minimum age preference for matching
   */
  minAge: number;
  /**
   * Maximum age preference for matching
   */
  maxAge: number;
  /**
   * Timestamp when the profile preferences were created
   */
  createdAt: string;
  /**
   * Timestamp when the profile preferences were last updated
   */
  updatedAt: string;
  /**
   * Preferred relation types for matching
   */
  relationType: RelationType[];
  /**
   * Preferred genders for matching
   */
  gender: Gender[];
};

/**
 * ProfilePictures type definition representing user profile picture.
 */
export type ProfilePicture = {
  /**
   * Unique identifier for the profile picture
   */
  id: string;
  /**
   * Identifier of the user to whom the picture belongs
   */
  userId: string;
  /**
   * URL of the profile picture
   */
  imageUrl: string;
  /**
   * Indicates if this picture is the primary profile picture
   */
  isPrimary: boolean;
  /**
   * Timestamp when the profile picture was created
   */
  createdAt: string;
};

/**
 * ProfileInterest type definition representing the association between profiles and interests.
 */
export type ProfileInterest = {
  /**
   * Unique identifier for the profile-interest association
   */
  profileId: string;
  /**
   * Unique identifier for the interest associated with the profile
   */
  interestId: string;
};

/**
 * ProfileLocation type definition representing user profile location.
 */
export type ProfileLocation = {
  /**
   * Unique identifier for the profile location
   */
  id: string;
  /**
   * Identifier of the profile to whom the location belongs
   */
  profileId: string;
  /**
   * Latitude coordinate of the profile's location
   */
  latitude: number;
  /**
   * Longitude coordinate of the profile's location
   */
  longitude: number;
  /**
   * Timestamp when the profile location was last updated
   */
  updatedAt: string;
};

/**
 * BlockedProfile type definition representing a blocked profile relationship.
 */
export type BlockedProfile = {
  /**
   * Unique identifier for the blocked profile relationship
   */
  id: string;
  /**
   * Identifier of the profile that initiated the block
   */
  blockerProfileId: string;
  /**
   * Identifier of the profile that was blocked
   */
  blockedProfileId: string;
  /**
   * Timestamp when the block was created
   */
  createdAt: string;
};
