import LeetcodeAPI, { QuestionData } from "..";

describe("Leetcode API library LeetcodeAPI class tests", () => {
	test("Can successfully grab problems from leetcode.com", async () => {
		const leetcodeAPI: LeetcodeAPI = new LeetcodeAPI();
		const questions: Array<QuestionData> = await leetcodeAPI.getQuestionData();
		expect(questions).not.toHaveLength(0);

		const question: QuestionData = questions[0];
		expect(question.titleSlug).not.toBeUndefined();
		expect(question.questionId).not.toBeUndefined();
	});
});
