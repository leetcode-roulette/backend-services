/**
 * Returned tags at `/tag` endpoint.
 */
export interface ParsedTag {

  /**
   * String representing the name of the tag.
   */
  name: string;

  /**
   * String representing the tags slug.
   */
  slug: string;

  /**
   * Number representing the number of questions that have this tag.
   */
  number_of_questions: number;

}
