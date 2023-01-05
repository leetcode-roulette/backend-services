/**
 * Unparsed cookies names and values.
 */
export interface Cookie {

  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The value of the cookie with the provided name.
   */
  value: string;

}

/**
 * A Leetcode users username and userId.
 */
export interface UserStatus {

  /**
   * String value representing the provided users Leetcode username.
   */
  username: string;

  /**
   * Number value representing the provided users Leetcode userId.
   */
  userId: number | null;

}
