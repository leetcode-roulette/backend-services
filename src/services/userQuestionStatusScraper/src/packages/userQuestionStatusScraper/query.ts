import axios, { AxiosResponse } from "axios";

/**
 * Creates a graphql request to `https://leetcode.com` to retrieve user question status data.
 * @returns Graphql response consisting of user question status data.
 */
export const getGraphQLResponse = async (query: string, session: string): Promise<AxiosResponse> => {
	const cookies: Array<string> = getCookies([{ name: "LEETCODE_SESSION", value: session }]);
	const url = "https://leetcode.com/graphql";
	const headers = {
		Cookie: cookies
	};

	try {
		const response = await axios.post(url, { query }, { headers });
		return response.data;
	} catch(e) {
		throw new Error("Error scraping user info from leetcode: " + e);
	}
};

const getCookies = (cookies: Array<{ name: string, value: string }>): Array<string> => {
	const parsedCookies: Array<string> = [];

	cookies.forEach(cookie => {
		parsedCookies.push(`${cookie.name}=${cookie.value};`);
	});

	return parsedCookies;
};
