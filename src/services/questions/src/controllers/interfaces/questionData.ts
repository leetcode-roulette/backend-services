/**
 * 
 */
export interface QuestionData {
  title: string;
  title_slug: string;
  tags: Array<string>;
  id: number;
  frontend_id: number;
  difficulty: number;
  premium: boolean;
  description: string;
  hints: Array<string>;
  completed?: boolean;
  attempted?: boolean;
}
