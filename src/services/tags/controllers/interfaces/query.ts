/**
 * Express Query used on `GET /tags` route.
 */
export interface Query {

  /**
   * Number value indicating the number of tags to retrieve
   */
  limit: number,

  /**
   * Number value indicating which page number to show
   */
  page: number,

  /**
   * String value indicating how to sort tags
   */
  sort: string

}
