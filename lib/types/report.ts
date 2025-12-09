/**
 * Report type definition representing a user report.
 */
export type Report = {
  /**
   * Unique identifier for the report
   */
  id: string;
  /**
   * Identifier of the profile that submitted the report
   */
  reporterProfileId: string;
  /**
   * Identifier of the profile that is being reported
   */
  reportedProfileId: string;
  /**
   * Reason for the report
   */
  reason: string;
  /**
   * Optional description providing additional details about the report
   */
  description?: string;
  /**
   * Status of the report
   */
  status: ReportStatus;
  /**
   * Timestamp when the report was created
   */
  createdAt: string;
};

/**
 * Enumeration of possible report status options
 */
export const REPORT_STATUS = {
  PENDING: "pending",
  REVIEWED: "reviewed",
  ACTION_TAKEN: "action_taken",
} as const;

/**
 * Union type derived from REPORT_STATUS values, used for strict typing.
 */
export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
