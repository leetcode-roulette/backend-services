/**
 * Unparsed cookie object consisting of name and value pair.
 */
 export interface Cookie {
  
  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The cookies value.
   */
  value: string;
}

/**
 * Graphql options.s
 */
export interface Options {

  /**
   * Array of unparsed cookies.
   */
  cookies: Array<Cookie>;

  /**
   * Error message to be thrown if there is an error making request.
   */
  errMsg: string;
}
