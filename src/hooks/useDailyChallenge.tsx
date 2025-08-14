import { useEffect, useState } from 'react';
import { SignType } from '@/types/sign';
import { signService } from '@/service/signServices';
import { getTodayString } from '@/utils/date';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DAILY_CHALLENGE_KEY = 'DAILY_CHALLENGE_PROGRESS';

type DailyChallenge = {
  date: string;
  signs: string[]; // array of sign IDs
  completed: string[]; // array of completed sign IDs
};

export const useDailyChallenge = () => {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [challengeSigns, setChallengeSigns] = useState<SignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Load or create daily challenge
  useEffect(() => {
    const loadDailyChallenge = async () => {
      setIsLoading(true);
      try {
        const today = getTodayString();
        const storedChallenge = await AsyncStorage.getItem(DAILY_CHALLENGE_KEY);
        
        let challenge: DailyChallenge;
        
        if (storedChallenge) {
          challenge = JSON.parse(storedChallenge);
          if (challenge.date !== today) {
            // Create new challenge if it's a new day
            challenge = await createNewChallenge();
          }
        } else {
          // Create first challenge
          challenge = await createNewChallenge();
        }
        
        setDailyChallenge(challenge);
        await loadChallengeSigns(challenge.signs);
        setProgress(challenge.completed.length / 3);
      } catch (error) {
        console.error('Error loading daily challenge:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDailyChallenge();
  }, []);

  const createNewChallenge = async (): Promise<DailyChallenge> => {
    const today = getTodayString();
    // Get 3 random signs (not learned yet if possible)
    const allSigns = await signService.loadAllSigns();
    const unlearnedSigns = allSigns.filter(s => !s.learned);
    const sourceSigns = unlearnedSigns.length >= 3 ? unlearnedSigns : allSigns;
    
    // Shuffle and pick 3
    const shuffled = [...sourceSigns].sort(() => 0.5 - Math.random());
    const challengeSigns = shuffled.slice(0, 3).map(s => s.id);
    
    const newChallenge: DailyChallenge = {
      date: today,
      signs: challengeSigns,
      completed: []
    };
    
    await AsyncStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(newChallenge));
    return newChallenge;
  };

  const loadChallengeSigns = async (signIds: string[]) => {
    const allSigns = await signService.loadAllSigns();
    const signs = signIds.map(id => allSigns.find(s => s.id === id)).filter(Boolean) as SignType[];
    setChallengeSigns(signs);
  };

  const completeSign = async (signId: string) => {
    if (!dailyChallenge) return;
    
    await signService.markSignAsLearned(signId);
    
    // Update challenge progress
    const updatedChallenge = {
      ...dailyChallenge,
      completed: [...dailyChallenge.completed, signId]
    };
    
    await AsyncStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(updatedChallenge));
    setDailyChallenge(updatedChallenge);
    setProgress(updatedChallenge.completed.length / 3);
    
    await loadChallengeSigns(updatedChallenge.signs);
  };

  return {
    dailyChallenge,
    challengeSigns,
    isLoading,
    progress,
    completeSign,
    refresh: () => dailyChallenge
  };
};