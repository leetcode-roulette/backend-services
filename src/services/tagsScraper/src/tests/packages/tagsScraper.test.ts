import { scrape } from "@packages/tagsScraper";
import { getGraphQLResponse } from "@packages/tagsScraper/query";
import { transformTagData } from "@packages/tagsScraper/transform";
import { Question, Tag } from "@packages/tagsScraper/types";

describe("Tests for `tagsScraper` package", () => {
	test("Can scrape tags from leetcode", async () => {
		expect(scrape).not.toThrowError();
		expect(scrape()).resolves.not.toHaveLength(0);
	});

	test("Can make a graphql request to leetcode", async () => {
		expect(getGraphQLResponse).not.toThrowError();
	});

	test("Can get an array of tags", () => {
		const hello: Tag = { name: "Hello", slug: "hello" };
		const world: Tag = {name: "World", slug: "world"};
		const questions: Array<Question> = [{ tags: [hello] }, { tags: [hello, world] }, {tags: [world] }];
		const tags: Array<Tag> = transformTagData(questions);

		expect(tags).toHaveLength(2);
		expect(tags).toContain(hello);
		expect(tags).toContain(world);
	});
});
