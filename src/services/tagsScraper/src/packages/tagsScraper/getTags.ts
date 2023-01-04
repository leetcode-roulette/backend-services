import { Question, Tag } from "./types";

export const getTags = (questions: Array<Question>): Array<Tag> => {
	const parsedTags: Array<Tag> = [];
	const tagsSet: Set<string> = new Set();

	questions.forEach(async question => {
		const tags = question.tags;

		tags.forEach(tag => {
			if (!tagsSet.has(tag.slug)) {
				tagsSet.add(tag.slug);
				parsedTags.push(tag);
			}
		});
	});

	return parsedTags;
};
