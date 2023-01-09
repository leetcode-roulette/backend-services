/**
 * Parsed user data containing user information.
 */
export interface ParsedUserData {

  /**
   * Users Leetcode username.
   */
  username: string;

  /**
   * Users Leetcode avatar url.
   */
  avatar: string;

  /**
   * Users Leetcode premium status.
   */
  is_premium: boolean;

  /**
   * Number of Leetcode questions user has solved by difficulty.
   */
  solved: Solved;

}

/**
 * Number of Leetcode questions user has solved by difficulty.
 */
interface Solved {

  /**
   * Total number of solved Leetcode questions.
   */
  total: number;

  /**
   * Number of easy Leetcode questions solved.
   */
  easy: number;

  /**
   * Number of medium Leetcode questions solved.
   */
  medium: number;

  /**
   * Number of hard Leetcode questions solved.
   */
  hard: number;
}
