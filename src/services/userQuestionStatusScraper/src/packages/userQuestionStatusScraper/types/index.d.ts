/**
 * Parsed Leetcode graphql response.
 */
export interface ParsedData {

  /**
   * Leetcode user.
   */
  user: User;

  /**
   * Array of Leetcode questions.
   */
  questions: Array<ParsedQuestion>;

}

/**
 * Leetcode user.
 */
export interface User {

  /**
   * Leetcode users username.
   */
  username: string;

  /**
   * Leetcode users userId.
   */
  userId: number;

}

/**
 * Leetcode question.
 */
export interface Question {

  /**
   * Questions status.
   */
  status: string;

  /**
   * Questions difficulty
   */
  difficulty: string;

  /**
   * Questions title.
   */
  questionTitle: string;

  /**
   * Questions title slug.
   */
  questionTitleSlug: string;

  /**
   * Questions id.
   */
  questionId: string;

  /**
   * Questions frontend id.
   */
  questionFrontendId: string;

}

export interface ParsedQuestion {

  /**
   * Status if question has been solved.
   */
   isCompleted: boolean;

   /**
    * Status if question has been attempted.
    */
   hasBeenAttempted: boolean;
 
   /**
    * Difficulty of question.
    */
   difficulty: number;
 
   /**
    * Title of question.
    */
   title: string;
 
   /**
    * Title slug of question.
    */
   slug: string;
 
   /**
    * Questions id number.
    */
   id: number;
 
   /**
    * Questions number on Leetcode.
    */
   frontendId: number;
}
