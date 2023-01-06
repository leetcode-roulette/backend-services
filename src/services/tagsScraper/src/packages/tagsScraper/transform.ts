import { Question, Tag } from "./types";

/**
 * Transforms tag data to useable format.
 * @param questions - question data to be transformed.
 * @returns Parsed tags.
 */
export const transformTagData = (questions: Array<Question>): Array<Tag> => {
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
