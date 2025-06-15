export type AICategory = 'SALES' | 'FOLLOWUP' | 'OTHER';

export interface AIResponse {
  type: AICategory;
  assistant: string | null;
}

export interface AIError {
  message: string;
  code?: string;
}
