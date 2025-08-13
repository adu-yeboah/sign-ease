import { useState, useEffect } from 'react';
import { QuizQuestion, QuizCategory, QuizDifficulty } from '@/types/quiz';
import { signService } from '@/service/signServices';

export const useQuiz = (category: QuizCategory, difficulty?: QuizDifficulty) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const quizData = await signService.getQuizQuestions(category, difficulty);
        
        const shuffled = [...quizData].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10));
      } catch (err) {
        setError('Failed to load quiz questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [category, difficulty]);

  return { questions, loading, error };
};