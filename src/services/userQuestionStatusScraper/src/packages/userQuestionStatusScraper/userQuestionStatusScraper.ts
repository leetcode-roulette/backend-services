import axios, { AxiosResponse } from "axios";

const difficulty: {[key: string]: number} = {
	"Easy": 0,
	"Medium": 1,
	"Hard": 2
};

/**
 * Gets an object containing a users information and question statuses from leetcodes graphql client.
 * @param session - User to scrape's leetcode session token.
 * @returns An object containing the users information and question statuses.
 */
const scrape = async (session: string): Promise<{
	user: {
		username: string,
		userId: number
	},
	questions: Array<{
		isCompleted: boolean,
		hasBeenAttempted: boolean,
		difficulty: number,
		questionTitle: string,
		questionTitleSlug: string,
		questionId: number,
		questionFrontendId: number
	}> 
}> => {
	const query = `query {
		problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 100000) {
			questions: data {
				status
				difficulty
				questionTitle
				questionTitleSlug
				questionId
				questionFrontendId
			}
		}
	}`;

	try {
		const user = await getUser(session);
		const response = await makeGraphQlRequest(query, session);
		const questions: Array<{
			status: string, 
			difficulty: string, 
			questionTitle: string, 
			questionTitleSlug: string,
			questionId: string, 
			questionFrontendId: string 
		}> = response.data.problemsetQuestionList.questions;
		const data = {
			user,
			questions: questions.map(question => ({
				isCompleted: question.status === "ac",
				hasBeenAttempted: question.status !== null,
				difficulty: difficulty[question.difficulty],
				questionTitle: question.questionTitle,
				questionTitleSlug: question.questionTitleSlug,
				questionId: parseInt(question.questionId),
				questionFrontendId: parseInt(question.questionFrontendId)
			}))
		};
		return data;
	} catch(e) {
		throw new Error("Error scraping user info from leetcode: " + e);
	}
};

const getUser = async (session: string): Promise<{ username: string, userId: number }> => {
	const query = `query {
		userStatus {
			username
			userId
		}
	}`;

	try {
		const response = await makeGraphQlRequest(query, session);
		return response.data.userStatus;
	} catch(e) {
		throw new Error("Error scraping username from leetcode: " + e);
	}
};

const makeGraphQlRequest = async (query: string, session: string): Promise<AxiosResponse> => {
	const url= "https://leetcode.com/graphql";
	const cookies: Array<string> = getCookies([{ name: "LEETCODE_SESSION", value: session }]);
	const headers = {
		Cookie: cookies
	};

	try {
		const response = await axios.post(url, { query }, { headers });
		return response.data;
	} catch(e) {
		throw new Error("Error scraping username from leetcode: " + e);
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
