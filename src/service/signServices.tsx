import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignType, SignCategory } from '@/types/sign';
import { QuizQuestion, QuizDifficulty } from '@/types/quiz';
import { allQuizzes } from '@/data/quiz';
import alphabetData from '@/data/alphabet';
import { simpleData } from '@/data/simple';
import foodsData from '@/data/foods';
import greetingsData from '@/data/greetings';
import numbersData from '@/data/numbers';

const DEFAULT_SIGNS: SignType[] = [...alphabetData, ...simpleData, ...foodsData, ...greetingsData, ...numbersData];

class SignService {
  private KEY = "SIGN_LANGUAGE_APP_DATA";
  private QUIZ_KEY = "SIGN_LANGUAGE_QUIZ_DATA";

  // Load all signs from storage or default data
  async loadAllSigns(): Promise<SignType[]> {
    try {
      const storedData = await AsyncStorage.getItem(this.KEY);
      return storedData ? JSON.parse(storedData) : DEFAULT_SIGNS;
    } catch (error) {
      console.error("Error loading signs:", error);
      return DEFAULT_SIGNS;
    }
  }

  // Update a specific sign
  async updateSign(id: string, updates: Partial<SignType>): Promise<SignType[]> {
    try {
      const signs = await this.loadAllSigns();
      const updatedSigns = signs.map(sign => 
        sign.id === id ? { ...sign, ...updates } : sign
      );
      await AsyncStorage.setItem(this.KEY, JSON.stringify(updatedSigns));
      return updatedSigns;
    } catch (error) {
      console.error("Error updating sign:", error);
      throw error;
    }
  }

  // Get signs by category
  async getSignsByCategory(category: SignCategory): Promise<SignType[]> {
    const signs = await this.loadAllSigns();
    return signs.filter(sign => sign.category === category);
  }

  // Get progress stats per category
  async getProgressByCategory(): Promise<Record<SignCategory, { learned: number; total: number }>> {
    const signs = await this.loadAllSigns();
    const categories: SignCategory[] = [
      'alphabet', 'numbers', 'animals', 'food', 
      'greetings', 'family', 'simple', 'actions'
    ];
    
    return categories.reduce((acc, category) => {
      const categorySigns = signs.filter(sign => sign.category === category);
      acc[category] = {
        learned: categorySigns.filter(sign => sign.learned).length,
        total: categorySigns.length,
      };
      return acc;
    }, {} as Record<SignCategory, { learned: number; total: number }>);
  }



  // Get quiz questions by category and difficulty
  async getQuizQuestions(
    category: SignCategory,
    difficulty?: QuizDifficulty
  ): Promise<QuizQuestion[]> {
    try {
      const storedQuizzes = await AsyncStorage.getItem(this.QUIZ_KEY);
      let quizzes: QuizQuestion[] = [];
      
      if (storedQuizzes) {  
        quizzes = JSON.parse(storedQuizzes)[category];
      } else {
        quizzes = allQuizzes[category] || [];
        await AsyncStorage.setItem(this.QUIZ_KEY, JSON.stringify(allQuizzes));
      }

      
      // Filter by category and difficulty
      let filtered = quizzes && quizzes.filter(q => q.category === category);
      
      if (difficulty) {
        filtered = filtered.filter(q => q.difficulty === difficulty);
      }

      return filtered;
    } catch (error) {
      console.error("Error loading quiz questions:", error);
      return [];
    }
  }

  // Save quiz results
  async saveQuizResults(
    category: SignCategory,
    score: number,
    total: number,
    difficulty?: QuizDifficulty
  ): Promise<void> {
    try {
      const result = {
        date: new Date().toISOString(),
        category,
        difficulty,
        score,
        total,
        percentage: Math.round((score / total) * 100)
      };

      const existing = await AsyncStorage.getItem(`${this.QUIZ_KEY}_RESULTS`);
      const allResults = existing ? JSON.parse(existing) : [];
      
      await AsyncStorage.setItem(
        `${this.QUIZ_KEY}_RESULTS`,
        JSON.stringify([...allResults, result])
      );
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }
  }

  // Get quiz history
  async getQuizHistory(): Promise<Array<{
    date: string;
    category: SignCategory;
    difficulty?: QuizDifficulty;
    score: number;
    total: number;
    percentage: number;
  }>> {
    try {
      const results = await AsyncStorage.getItem(`${this.QUIZ_KEY}_RESULTS`);
      return results ? JSON.parse(results) : [];
    } catch (error) {
      console.error("Error loading quiz history:", error);
      return [];
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.KEY);
      await AsyncStorage.removeItem(this.QUIZ_KEY);
      await AsyncStorage.removeItem(`${this.QUIZ_KEY}_RESULTS`);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  }

  // Mark a sign as learned
  async markSignAsLearned(id: string): Promise<void> {
    try {
      const signs = await this.loadAllSigns();
      const updatedSigns = signs.map(sign => 
        sign.id === id ? { ...sign, learned: true } : sign
      );
      await AsyncStorage.setItem(this.KEY, JSON.stringify(updatedSigns));
    } catch (error) {
      console.error("Error marking sign as learned:", error);
      throw error;
    }
  }
}

export const signService = new SignService();