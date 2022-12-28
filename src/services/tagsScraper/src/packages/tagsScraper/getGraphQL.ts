import axios, { AxiosResponse } from "axios";

export const getGraphQL = async (): Promise<AxiosResponse> => {
	const url = "https://leetcode.com/graphql";
	const query = `query {
		problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 10000) {
			questions: data {
				tags: topicTags {
					name
					slug
				}
			}
		}
	}`;

	try {
		const response = await axios.post(url, { query }, { headers: {} });
		return response.data;
	} catch(e) {
		throw new Error("Error scraping tags from leetcode: " + e);
	}
};
