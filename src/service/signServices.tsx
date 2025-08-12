import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignType, SignCategory } from '@/types/sign';
import alphabetData from '@/data/alphabet';
import { simpleData } from '@/data/simple';

const DEFAULT_SIGNS: SignType[] = [...alphabetData, ...simpleData];

class SignService {
  private KEY = "SIGN_LANGUAGE_APP_DATA";

  async loadAllSigns(): Promise<SignType[]> {
    try {
      const storedData = await AsyncStorage.getItem(this.KEY);
      return storedData ? JSON.parse(storedData) : DEFAULT_SIGNS;
    } catch (error) {
      console.error("Error loading signs:", error);
      return DEFAULT_SIGNS;
    }
  }

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
    const categories: SignCategory[] = ['alphabet', 'numbers', 'animals', 'food', 'greetings', 'family', 'colors', 'actions'];
    
    return categories.reduce((acc, category) => {
      const categorySigns = signs.filter(sign => sign.category === category);
      acc[category] = {
        learned: categorySigns.filter(sign => sign.learned).length,
        total: categorySigns.length,
      };
      return acc;
    }, {} as Record<SignCategory, { learned: number; total: number }>);
  }
}

export const signService = new SignService();