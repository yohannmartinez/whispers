/**
 * Conversation type definition representing a chat conversation between matched profiles.
 */
export type Conversation = {
  /**
   * Unique identifier for the conversation
   */
  id: string;
  /**
   * Identifier of the match associated with the conversation
   */
  matchId: string;
  /**
   * Timestamp when the conversation was created
   */
  createdAt: string;
  /**
   * Timestamp of the last message in the conversation
   */
  lastMessageAt: string;
};

/**
 * Message type definition representing a message within a conversation.
 */
export type Message = {
  /**
   * Unique identifier for the message
   */
  id: string;
  /**
   * Identifier of the conversation to which the message belongs
   */
  conversationId: string;
  /**
   * Identifier of the profile that sent the message
   */
  senderProfileId: string;
  /**
   * Content of the message
   */
  content: string;
  /**
   * Timestamp when the message was created
   */
  createdAt: string;
  /**
   * Indicates if the message has been deleted
   */
  isDeleted: boolean;
};
