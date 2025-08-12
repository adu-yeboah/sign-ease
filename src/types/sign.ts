export type SignCategory =
  | 'alphabet'  // A, B, C...
  | 'numbers'   // 1, 2, 3...
  | 'greetings' // Hello, Thank you
  | 'animals'   // Dog, Cat
  | 'food'      // Apple, Pizza
  | 'family'    // Mom, Dad
  | 'colors'    // Red, Blue
  | 'actions';  // Run, Jump


  export type SignDifficulty = 'easy' | 'medium' | 'hard';

// Core sign type
export type SignType = {
  id: string;
  name: string;
  media: string[]; 
  description: string;
  category: SignCategory;
  difficulty?: SignDifficulty;
  learned?: boolean;
  lastPracticed?: string; 
};

// Progress tracking per category
export type ProgressByCategory = {
  [key in SignCategory]?: {
    learned: number;
    total: number;
  };
};