import axios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults as LeetcodeAPIConfig } from "axios";
import { iLeetcodeAPI, QuestionData } from ".";

// Interfaces mathcing leetcodes provided schema at https://leetcode.com/api/problems/all

interface Stat {
	question_id: number,
	question__title_slug: string
}

interface LeetcodeData {
	status: string,
	stat: Stat
}

/**
 * `LeetcodeAPI` class fetches question data from `leetcode.com` problems API
 */
export default class LeetcodeAPI implements iLeetcodeAPI {
	private api: AxiosInstance;

	/**
	 * 
	 * @param config - Axios config data for api request
	 */
	constructor(config?: LeetcodeAPIConfig) {
		this.api = axios.create({
			...config,
			baseURL: "https://leetcode.com/"
		});
	}

	public async getQuestionData(): Promise<Array<QuestionData>> {
		let output: Array<QuestionData>;

		try {
			const data: AxiosResponse = await this.api.get("/api/problems/all");

			const questions: Array<LeetcodeData> = data.data.stat_status_pairs;
			output = questions.map(question => ({
				questionId: question.stat.question_id,
				hasBeenAttempted: question.status !== null,
				isCompleted: question.status === "ac",
				titleSlug: question.stat.question__title_slug
			}));
		} catch(e) {
			throw new Error("Error extracting data from https://leetcode.com/api/problems/all: " + e);
		}

		return output;
	}
}
