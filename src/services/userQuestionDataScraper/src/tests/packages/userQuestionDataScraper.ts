import scrape from "@packages/userQuestionDataScraper";

describe("Tests for `userQuestionDataScraper` package", () => {
	test("Can ping the `leetcode.com/graphql` endpoint with the questions query", async () => {
		expect(scrape).not.toThrowError();

		const { user, questions } = await scrape("sessionToken");
		expect(user.username).toBeFalsy();
		expect(user.userId).toBeNull();
		expect(Array.isArray(questions)).toBe(true);
		expect(questions.length).toBeGreaterThan(0);
	});
});
