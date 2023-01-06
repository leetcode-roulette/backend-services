/**
 * Leetcode graphQL response for retrieving questions.
 */
export interface QuestionData {

  /**
   * Number value representing a questions id.
   */
  questionId: number;

  /**
   * Object array containing a questions tag names.
   */
  tags: Array<{ slug: string }>;

}

/**
 * Parsed Leetcode graphql response.
 */
export interface QuestionTag {

  /**
   * Number value representing a questions id.
   */
  questionId: number;

  /**
   * String value representing a tag slug.
   */
  tagSlug: string;
  
}
