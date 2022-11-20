import axios from "axios";

/**
 * Gets an object containing a users information from leetcodes graphql client.
 * @param session - User to scrapes leetcode session token.
 * @returns An object containing the users information.
 */
const scrape = async (session: string): Promise<{ userId: number | null, username: string }> => {
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
		const response = await axios.post(url, { query }, { headers });
		return response.data.data.userStatus;
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


export default scrape;
