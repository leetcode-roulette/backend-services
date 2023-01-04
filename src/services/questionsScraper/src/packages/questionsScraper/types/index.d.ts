export interface QuestionData {
  questionId: number;
  questionFrontendId: number;
  title: string;
  content: string;
  difficulty: string;
  titleSlug: string;
  isPaidOnly: boolean;
  hints: Array<string>;
  tags: Array<{ name: string }>;
}

export interface ParsedQuestion {
  _id: number;
  frontendId: number;
  title: string;
  content: string;
  difficulty: number;
  slug: string;
  isPremium: boolean;
  hints: Array<string>;
  tags: Array<string>;
}
