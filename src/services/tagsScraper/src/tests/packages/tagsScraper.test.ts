import { scrape } from "@packages/tagsScraper";

describe("Tests for `tagsScraper` package", () => {
	test("Can scrape tags from leetcode", async () => {
		expect(scrape).not.toThrowError();
		
		const tags = await scrape();
		expect(tags).not.toBeUndefined();
		expect(Array.isArray(tags)).toBe(true);
		expect(tags).not.toHaveLength(0);
	}, 30000);
});
