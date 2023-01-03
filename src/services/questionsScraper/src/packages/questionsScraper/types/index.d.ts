export interface QuestionData {
  questionId: number;
  questionFrontendId: number;
  title: string;
  content: string;
  difficulty: string;
  titleSlug: string;
  isPaidOnly: boolean;
  hints: Array<string>;
  stats: string;
  tags: Array<{ name: string }>;
}

export interface Stats {
  totalAccepted: string;
  totalSubmission: string;
  totalAcceptedRaw: number;
  totalSubmissionRaw: number;
  acRate: string;
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
  accepted: number;
  submissions: number;
  tags: Array<string>;
}
