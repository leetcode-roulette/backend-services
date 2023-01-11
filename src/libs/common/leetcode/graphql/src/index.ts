import axios, { AxiosResponse } from "axios";

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

const defaultOptions: Options = {
  cookies: [],
  errMsg: "Error making request to `https://leetcode.com/graphql`: "
}

/**
 * Creates a request to `https://leetcode.com/graphql` using the provided query and options.
 * @param query - Graphql query to make at `https://leetcode.com/graphql`.
 * @param options - Options object consisting of additional configuration variables.
 * @returns - AxiosResponse object consisting of `https://leetcode.com/graphql` response data.
 */
const getLeetcodeGraphQl = async (query: string, options: Partial<Options> = {}): Promise<AxiosResponse> => {
  // Update options to use any passed in options.
  options = {
    ...defaultOptions,
    ...options
  };

  const url = "https://leetcode.com/graphql";
  const headers: object = {
    Cookie: parseCookies(options.cookies!)
  };

  try {
		const response: AxiosResponse = await axios.post(url, { query }, { headers });
		return response;
	} catch(e) {
		throw new Error(options.errMsg! + e);
	}
}

/**
 * Parses an array of unparsed Cookie objects.
 * @param cookies - Array of unparsed cookies.
 * @returns - Array of parsed cookies.
 */
const parseCookies = (cookies: Array<Cookie>): Array<string> => {
  const parsedCookies: Array<string> = [];

	cookies.forEach(cookie => {
		parsedCookies.push(`${cookie.name}=${cookie.value};`);
	});

	return parsedCookies;
}

export default getLeetcodeGraphQl;
