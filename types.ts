export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Gender = 'man' | 'woman';

export interface PracticeQuestion {
  id: string;
  title: string;
  description: string;
  originalClaim: string;
  novelty: string;
  inventiveStep: string;
  imageUrls?: string[];
  imageBase64s?: string[];
}

export interface AIFeedback {
  score: number;
  feedback: {
    clarity: string;
    novelty: string;
    inventiveStep: string;
    overall: string;
  };
}

export interface UserProgressRecord {
    score: number;
    difficulty?: Difficulty;
}

export type UserProgress = Record<string, UserProgressRecord>; // key is questionId

export interface User {
  name: string;
  gender: Gender;
  email: string;
}
