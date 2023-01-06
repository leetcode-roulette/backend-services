import { AxiosResponse } from "axios";
import { getGraphQLResponse } from "./query";
import { transformTagData } from "./transform";
import { Question, Tag } from "./types";

export const scrape = async (): Promise<Array<Tag>> => {
	const response: AxiosResponse = await getGraphQLResponse();
	const questions: Array<Question> = response.data.problemsetQuestionList.questions;
	const tags = transformTagData(questions);
	return tags;
};
