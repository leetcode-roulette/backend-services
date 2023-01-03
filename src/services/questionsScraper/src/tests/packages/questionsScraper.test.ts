import getGraphQLResponse from "@packages/questionsScraper/query";
import scrape from "@packages/questionsScraper/scraper";
import transformQuestionData from "@packages/questionsScraper/transform";
import { QuestionData } from "@packages/questionsScraper/types";

describe("Tests for `userQuestionDataScraper` package", () => {
	test("Can scrape leetcode.com for question data", async () => {
		expect(scrape).not.toThrowError();
	}, 35000);

	test("Can get graphQL response from Leetcode.", async () => {
		const response = await getGraphQLResponse();
		expect(Array.isArray(response)).toBeTruthy();
	}, 35000);

	test("Can transform data to its expected output.", async () => {
		const rawData: Array<QuestionData> = [{
			questionId: 1,
			questionFrontendId: 1,
			title: "Two Sum",
			titleSlug: "two-sum",
			isPaidOnly: false,
			difficulty: "Easy",
			content: "Two sum description",
			hints: [],
			stats: "{\"totalAccepted\": \"8.6M\", \"totalSubmission\": \"17.5M\", \"totalAcceptedRaw\": 8604483, \"totalSubmissionRaw\": 17487197, \"acRate\": \"49.2%\"}",
			tags: [{ name: "Array" }, { name: "Hash Table" }]
		}];

		expect(transformQuestionData(rawData)).toHaveLength(1);
	});
});
