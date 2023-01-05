import axios, { AxiosResponse } from "axios";
import { Cookie } from "./types";

/**
 * Retrieves graphql response from https://leetcode.com/graphql.
 * @param session - Session cookie used to retrieve authenticated information.
 * @returns Graphql response from https://leetcode.com/graphql.
 */
export const getGraphQLResponse = async (session: string): Promise<AxiosResponse> => {
	const url= "https://leetcode.com/graphql";
	const query = `query {
		userStatus {
			userId
			username
		}
	}`;
	const cookies: Array<string> = getCookies([{ name: "LEETCODE_SESSION", value: session }]);
	const headers = {
		Cookie: cookies
	};

	try {
		const response: AxiosResponse = await axios.post(url, { query }, { headers });
		return response;
	} catch(e) {
		throw new Error("Error retrieving graphql response: " + e);
	}
};

/**
 * Creates a cookie array from a cookies name and value.
 * @param cookies - Array of cookie names and values.
 * @returns Array of cookies.
 */
const getCookies = (cookies: Array<Cookie>): Array<string> => {
	const parsedCookies: Array<string> = [];

	cookies.forEach(cookie => {
		parsedCookies.push(`${cookie.name}=${cookie.value};`);
	});

	return parsedCookies;
};
