import axios, { AxiosResponse } from "axios";

interface Question {
	status: string;
	difficulty: string;
	questionTitle: string;
	questionTitleSlug: string;
	questionId: string;
	questionFrontendId: string;
}

interface Result {
	questions: Array<{
		isCompleted: boolean;
		hasBeenAttempted: boolean;
		difficulty: string;
		questionTitle: string;
		questionTitleSlug: string;
		questionId: number;
		questionFrontendId: number;
	}>
}

/**
 * Gets an object containing a users information and question statuses from leetcodes graphql client.
 * @param session - User to scrape's leetcode session token.
 * @returns An object containing the users information and question statuses.
 */
const scrapeUserQuestionData = async (session: string): Promise<Result> => {
	const url = "https://leetcode.com/graphql";
	const cookies: Array<string> = getCookies([{ name: "LEETCODE_SESSION", value: session }]);
	const headers = {
		Cookie: cookies
	};
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
		const response: AxiosResponse = await axios.post(url, { query }, { headers });
		const questions: Array<Question> = response.data.data.problemsetQuestionList.questions;
		const data = {
			questions: questions.map(question => ({
				isCompleted: question.status === "ac",
				hasBeenAttempted: question.status !== null,
				difficulty: question.difficulty,
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

const getCookies = (cookies: Array<{ name: string, value: string }>): Array<string> => {
	const parsedCookies: Array<string> = [];

	cookies.forEach(cookie => {
		parsedCookies.push(`${cookie.name}=${cookie.value};`);
	});

	return parsedCookies;
};


export default scrapeUserQuestionData;
