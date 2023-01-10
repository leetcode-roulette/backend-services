import { AxiosResponse } from "axios";
import { getGraphQLResponse } from "./query";
import { ParsedData, User, Question, ParsedQuestion } from "./types";

export const scrape = async (session: string): Promise<ParsedData> => {
	const questionQuery = `query {
		problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 100000) {
			questions: data {
				status
				difficulty
				title: questionTitle
				slug: questionTitleSlug
				id: questionId
				frontendId: questionFrontendId
			}
		}
	}`;

	const userQuery = `query {
		userStatus {
			username
			userId
		}
	}`;

	const questionsResponse: AxiosResponse = await getGraphQLResponse(questionQuery, session);
	const userResponse: AxiosResponse = await getGraphQLResponse(userQuery, session);

	const user: User = userResponse.data.userStatus;
	const questions: Array<Question> = questionsResponse.data.problemsetQuestionList.questions;
	const difficulty: {[key: string]: number} = {
		"Easy": 0,
		"Medium": 1,
		"Hard": 2
	};

	const parsedQuestions: Array<ParsedQuestion> = questions.map(question => ({
		isCompleted: question.status === "ac",
		hasBeenAttempted: question.status !== null,
		difficulty: difficulty[question.difficulty],
		title: question.questionTitle,
		slug: question.questionTitleSlug,
		id: parseInt(question.questionId),
		frontendId: parseInt(question.questionFrontendId)
	}));

	const parsedData: ParsedData = {
		user,
		questions: parsedQuestions
	};

	return parsedData;
};
