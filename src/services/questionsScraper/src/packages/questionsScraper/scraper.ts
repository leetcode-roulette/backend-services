import getGraphQLResponse from "./query";
import transformQuestionData from "./transform";
import { ParsedQuestion, QuestionData } from "./types";

/**
 * Scrapes question data from `https://leetcode.com`.
 * @returns An array of leetcode questions.
 */
const scrape = async (): Promise<Array<ParsedQuestion>> => {
	const questionData: Array<QuestionData> = await getGraphQLResponse();
	return transformQuestionData(questionData);
};


export default scrape;
