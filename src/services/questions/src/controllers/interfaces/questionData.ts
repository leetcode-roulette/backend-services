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
  accepted: number;
  submitted: number;
  acceptance_rate: number;
  completed?: boolean;
  attempted?: boolean;
}
