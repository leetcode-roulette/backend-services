import { AxiosResponse } from "axios";
import { getGraphQL } from "./getGraphQL";
import { getTags } from "./getTags";
import { Question, Tag } from "./types";

export const scrape = async (): Promise<Array<Tag>> => {
	const response: AxiosResponse = await getGraphQL();
	const questions: Array<Question> = response.data.problemsetQuestionList.questions;
	const tags = getTags(questions);
	return tags;
};
