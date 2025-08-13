import { SignCategory } from "@/types/sign";
import { allAlphabetQuizzes } from "./alphabet";
import { QuizQuestion } from "@/types/quiz";
import { SimpleWordsQuiz } from "./simplewords";

export const allQuizzes: Record<SignCategory, QuizQuestion[]> = {
  alphabet: allAlphabetQuizzes,
  numbers: [], 
  animals: [],
  food: [],    
  greetings: [], 
  family: [],   
  simple: [],   
  actions: []  
};