/**
 * Leetcode graphQL response for retrieving questions.
 */
export interface QuestionData {

  /**
   * Number value represneing Leetcode question id.
   */
  questionId: number;

  /**
   * Number value representing Leetcode question number.
   */
  questionFrontendId: number;

  /**
   * String value representing question title.
   */
  title: string;

  /**
   * String value representing question description HTML.
   */
  content: string;

  /**
   * String value representing question difficulty.
   */
  difficulty: string;

  /**
   * String value representing question title slug.
   */
  titleSlug: string;

  /**
   * Boolean value representing if a question is premium.
   */
  isPaidOnly: boolean;

  /**
   * String array representing a questions hints.
   */
  hints: Array<string>;

  /**
   * Object array containing a questions tag names.
   */
  tags: Array<{ name: string }>;

}

/**
 * Parsed Leetcode graphql response.
 */
export interface ParsedQuestion {

  /**
   * Number value representing a questions id.
   */
  _id: number;

  /**
   * Number value representing a question number on Leetcode.
   */
  frontendId: number;

  /**
   * String value representing a questions title.
   */
  title: string;

  /**
   * String value representing a questions description HTML.
   */
  content: string;

  /**
   * Number value representing a questions difficulty.
   */
  difficulty: number;

  /**
   * String value representing a questions title slug.
   */
  slug: string;

  /**
   * Boolean value representing if a question is premium.
   */
  isPremium: boolean;

  /**
   * String array representing a questions hints.
   */
  hints: Array<string>;

  /**
   * String array representing a questions tags.
   */
  tags: Array<string>;

}
