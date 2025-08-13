import { useEffect, useState } from 'react';
import { SignType, SignCategory } from '@/types/sign';
import { signService } from '@/service/signServices';

export const useSign = () => {
  const [signs, setSigns] = useState<SignType[]>([]);
  const [progress, setProgress] = useState<Record<SignCategory, { learned: number; total: number }>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all signs and progress on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedSigns, loadedProgress] = await Promise.all([
          signService.loadAllSigns(),
          signService.getProgressByCategory(),
        ]);
        setSigns(loadedSigns);
        setProgress(loadedProgress);
      } catch (err) {
        setError("Failed to load signs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Mark a sign as learned
  const markAsLearned = async (id: string, category: string) => {
    try {
      const updatedSigns = await signService.updateSign(id, { learned: true });
      const updatedProgress = await signService.getProgressByCategory();
      setSigns(updatedSigns);
      setProgress(updatedProgress);
    } catch (err) {
      setError("Failed to update sign");
      console.error(err);
    }
  };

  // Get signs by category
  const getSignsByCategory = (category: SignCategory) => {
    return signs.filter(sign => sign.category === category);
  };

  return {
    signs,
    progress,
    loading,
    error,
    markAsLearned,
    getSignsByCategory,
  };
};