import { QuestionData, ParsedQuestion } from "./types";


/**
 * Transforms question data to useable format.
 * @param questionData - question data to be transformed.
 * @returns Graphql response consisting of question data.
 */
const transformQuestionData = (questionData: Array<QuestionData>): Array<ParsedQuestion> => {
	const parsedQuestions: Array<ParsedQuestion> = questionData.map(question => {
		const difficulty: {[key: string]: number} = {
			"Easy": 0,
			"Medium": 1,
			"Hard": 2
		};

		return {
			_id: question.questionId,
			frontendId: question.questionFrontendId,
			title: question.title,
			slug: question.titleSlug,
			difficulty: difficulty[question.difficulty],
			isPremium: question.isPaidOnly,
			content: question.content,
			hints: question.hints,
			tags: question.tags.map(tag => tag.name)
		};
	});
	
	return parsedQuestions;
};

export default transformQuestionData;
