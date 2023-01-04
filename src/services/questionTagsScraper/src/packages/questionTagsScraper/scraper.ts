import getGraphQLResponse from "./query";
import transformQuestionData from "./transform";
import { QuestionTag, QuestionData } from "./types";

/**
 * Scrapes question tag data from `https://leetcode.com`.
 * @returns An array of leetcode questions.
 */
const scrape = async (): Promise<Array<QuestionTag>> => {
	const questionData: Array<QuestionData> = await getGraphQLResponse();
	return transformQuestionData(questionData);
};


export default scrape;
