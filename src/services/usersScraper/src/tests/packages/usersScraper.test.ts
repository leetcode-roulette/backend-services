import scrape from "@packages/usersScraper";

describe("Tests for `usersScraper` package", () => {
	test("Can ping the `leetcode.com/graphql` endpoint with the user query", async () => {
		expect(scrape).not.toThrowError();

		const { userId, username, isPremium, avatar } = await scrape("sessionToken");
		expect(userId).toBeNull();
		expect(username).toBeFalsy();
		expect(isPremium).toBeNull();
		expect(avatar).toBeNull();
	});
});
