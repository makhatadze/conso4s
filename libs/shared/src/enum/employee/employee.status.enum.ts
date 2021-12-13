export enum EmployeeStatusEnum {
  /** Unknown (if employee didn't checked in / checked out at all) */
  UNKNOWN = 0,

  /** Checked In */
  CHECKED_IN = 1,

  /** Checked Out */
  CHECKED_OUT = 2,
}

export const EmployeeStatusMessage = {
  0: 'Unknown',
  1: 'Checked In',
  2: 'Checked Out',
};
