import { QuestionData } from "./questionData";

/**
 * Interface for the `LeetcodeAPI` class
 * @interface iLeetcodeAPI
 */
export interface iLeetcodeAPI {

  /**
   * Gets question data from the leetcode.com APIs.
   */
  getQuestionData(): Promise<Array<QuestionData>>;

}
