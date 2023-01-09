/**
 * User interface for the currently authenticated Roulette user.
 */
export type User = {

  /**
   * Currently authenticated users username.
   */
  username: string;

  /**
   * Currently authenticated users id.
   */
  id: number;

  /**
   * Currently authenticated users leetcode premium status.
   */
  isPremium: boolean;

  /**
   * Currently authenticated users avatar url.
   */
  avatar: string;
  
}
