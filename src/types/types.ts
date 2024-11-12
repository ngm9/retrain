// src/types/types.ts
export interface Question {
  type: string;
  kind: string;
  question: string;
  answer: string;
  competencies: string[];
}

export interface Feedback {
  isApproved: boolean;
  reasoning: string;
}

export interface RetrainEntry {
  question_blob: Question;
  feedback: Feedback;
}