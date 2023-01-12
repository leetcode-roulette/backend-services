import axios, { AxiosResponse } from "axios";
import { Options, Cookie } from "./types";

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
const getLeetcodeGraphQL = async (query: string, options: Partial<Options> = {}): Promise<AxiosResponse> => {
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

export default getLeetcodeGraphQL;
export { Options, Cookie, AxiosResponse }
