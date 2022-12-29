export interface Tag {
	name: string;
	slug: string;
}

export interface Question {
	tags: Array<Tag>
}
