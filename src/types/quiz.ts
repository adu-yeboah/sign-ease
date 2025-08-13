import { SignCategory } from "./sign";

export type QuizCategory =
  | 'alphabet'  // A, B, C...
  | 'numbers'   // 1, 2, 3...
  | 'greetings' // Hello, Thank you
  | 'animals'   // Dog, Cat
  | 'food'      // Apple, Pizza
  | 'family'    // Mom, Dad
  | 'simple'    // Red, Blue
  | 'actions';  // Run, Jump

// types/quiz.ts
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export type QuizQuestion = {
  id: string;
  question: string;
  media?: {
    uri: any; 
    type: 'image' | 'video';
  };
  options: string[];
  correctAnswer: string;
  category: SignCategory;
  difficulty: QuizDifficulty;
  explanation?: string;
};