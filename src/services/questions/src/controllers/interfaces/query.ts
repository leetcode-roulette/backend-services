/**
 * Express Query used on `GET /questions` routes.
 */
export interface ExpressQuery {

	/**
	 * Number value indicating the number of tags to retrieve.
	 */
	limit: number;

	/**
	 * Number value indicating which page number to show.
	 */
	page: number;

	/**
	 * String value indicating how to sort questions.
	 */
	sort: string;

	/**
	 * Boolean value indicating if premium questions should be returned.
	 */
	premium: boolean;

	/**
	 * Array of values indicating which difficulties should be returned.
	 */
	difficulty: string;

	/**
	 * Array of tag slugs indicating which tags should be returned.
	 */
	tags: string;

	/**
	 * String indicating searched questions that should be returned.
	 */
	q: string;

}

/**
 * Mongoose Query used on `GET /questions` routes.
 */
export interface MongooseQuery {

	/**
	 * Indicates which difficulties to return.
	 */
	difficulty?: Difficulty;

	/**
	 * Indicates if premium questions should be returned.
	 */
	isPremium?: boolean;

	/**
	 * Regex string for which questions to return.
	 */
	title?: Search;

	/**
	 * List of question ids to return.
	 */
	_id?: QuestionId;
}

export interface Difficulty {
	$in: Array<number>;
}

interface Search {
	$regex: string;
	$options: string;
}

interface QuestionId {
	$in: Array<number>;
}
