import getGraphQLResponse from "@packages/questionTagsScraper/query";
import scrape from "@packages/questionTagsScraper";
import transformQuestionData from "@packages/questionTagsScraper/transform";
import { QuestionData } from "@packages/questionTagsScraper/types";

describe("Tests for `questionTagsScraper` package", () => {
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
			tags: [{ slug: "array" }, { slug: "hash-table" }]
		}];

		expect(transformQuestionData(rawData)).toHaveLength(2);
	});
});
