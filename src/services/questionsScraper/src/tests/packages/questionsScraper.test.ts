import getGraphQLResponse from "@packages/questionsScraper/query";
import transformQuestionData from "@packages/questionsScraper/transform";
import { QuestionData } from "@packages/questionsScraper/types";

describe("Tests for `questionScraper` package", () => {
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
			tags: [{ name: "Array" }, { name: "Hash Table" }]
		}];

		expect(transformQuestionData(rawData)).toHaveLength(1);
	});
});
