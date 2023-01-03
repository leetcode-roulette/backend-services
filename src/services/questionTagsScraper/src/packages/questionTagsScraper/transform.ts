import { QuestionData, QuestionTag } from "./types";


/**
 * Transforms question data to useable format.
 * @param questionData - question data to be transformed.
 * @returns Parsed question tag objects.
 */
const transformQuestionData = (questionData: Array<QuestionData>): Array<QuestionTag> => {
	const questionTags: Array<QuestionTag> = [];
	
	questionData.forEach(question => {
		question.tags.forEach(tag => {
			questionTags.push({
				questionId: question.questionId,
				tagSlug: tag.slug
			});
		});
	});
	
	return questionTags;
};

export default transformQuestionData;
