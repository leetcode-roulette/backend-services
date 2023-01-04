import axios, { AxiosResponse } from "axios";
import { QuestionData } from "./types";


/**
 * Creates a graphql request to `https://leetcode.com` to retrieve question data.
 * @returns Graphql response consisting of question data.
 */
const getGraphQLResponse = async (): Promise<Array<QuestionData>> => {
	const url = "https://leetcode.com/graphql";
	const query = `query {
		problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 100000) {
			data {
				questionId
				questionFrontendId
				title
				content
				difficulty
				titleSlug
				isPaidOnly
				hints
				tags: topicTags {
						name
				}
			}
		}
	}`;

	try {
		const response: AxiosResponse = await axios.post(url, { query });
		return response.data.data.problemsetQuestionList.data;
	} catch(e) {
		throw new Error("Error scraping user info from leetcode: " + e);
	}
};


export default getGraphQLResponse;
