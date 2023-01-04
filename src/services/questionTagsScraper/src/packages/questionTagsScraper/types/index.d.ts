export interface QuestionData {
  questionId: number;
  tags: Array<{ slug: string }>;
}

export interface QuestionTag {
  questionId: number;
  tagSlug: string;
}
