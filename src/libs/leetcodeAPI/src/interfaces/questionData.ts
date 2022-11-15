/**
 * Relevant question data scraped from `https://leetcode.com/api/problems/all`
 */
export interface QuestionData {

  /**
   * Number value representing associated question id on leetcode.com
   */
  questionId: number,

  /**
   * Boolean value indicating if the authenticated user has attempted the question
   */
  hasBeenAttempted: boolean,

  /**
   * Boolean value indicating if the authenticated user has successfully completed the question
   */
  isCompleted: boolean,

  /**
   * String value representing the associated title slug on leetcode.com
   */
  titleSlug: string
  
}
