import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { QuizQuestion } from '../types/utils';
import signsData from "../data/sign.json";
import AnimatedButton from '../components/Button';
import SafeWrapper from '../components/ui/SafeWrapper';
import { AlphabetQuiz } from '@/data/quiz/alphabet';
import { SimpleWordsQuiz } from '@/data/quiz/simplewords';
import { AdvanceQuiz } from '@/data/quiz/advance';


const QuizScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { categoryType } = route.params;

   const initialQuestions = React.useMemo(() => {
    switch (categoryType) {
      case 'alphabet': return AlphabetQuiz;
      case 'simple': return SimpleWordsQuiz;
      case 'advanced': return AdvanceQuiz;
      default: return [];
    }
  }, [categoryType]);

  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  
  const currentQuestion = questions[currentQuestionIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'alphabet': return 'bg-accent-500';
      case 'simple': return 'bg-primary-500';
      case 'advanced': return 'bg-secondary-500';
      default: return 'bg-accent-500';
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    setTimeout(() => {
      console.log("currentID", currentQuestionIndex);
      console.log("question", questions.length);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  if (quizCompleted) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <Animatable.View
            animation="bounceIn"
            duration={1000}
            className={`${getCategoryColor(categoryType)} rounded-2xl p-8 w-full items-center`}
          >
            <Text className="text-3xl font-bold text-white font-display mb-4">
              Quiz Complete!
            </Text>
            <View className="bg-white/20 rounded-full px-6 py-4 mb-6">
              <Text className="text-white text-2xl font-bold">
                {score} / {questions.length}
              </Text>
            </View>
            <Text className="text-white text-lg text-center mb-6">
              {score === questions.length ? "🌟 Perfect score! Amazing!" :
                score >= questions.length / 2 ? "👍 Good job! Keep practicing!" :
                  "Keep practicing! You'll get better!"}
            </Text>
            <AnimatedButton
              title="Back to Learning"
              onPress={() => navigation.goBack()}
              className="w-full bg-accent-400"
              icon="arrow-back"
            />
          </Animatable.View>
        </View>
      </SafeWrapper>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-accent-700 font-display text-lg">
            No quiz questions available for this sign.
          </Text>
          <AnimatedButton
            title="Back to Learning"
            onPress={() => navigation.goBack()}
            className="w-full mt-6 bg-accent-500"
            icon="arrow-back"
          />
        </View>
      </SafeWrapper>
    );
  }

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-accent-700 font-display">
          Quiz
        </Text>
        <View className="w-6" />
      </View>

      <View className="flex-1 px-6">
        {/* Progress Indicator */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-accent-500 font-medium">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <View className="bg-accent-100 rounded-full h-2 flex-1 mx-3">
            <View
              className={`${getCategoryColor(categoryType)} h-2 rounded-full`}
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </View>
          <Text className="text-accent-500 font-medium">
            {score} pts
          </Text>
        </View>

        {/* Question Card */}
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          className={`${getCategoryColor(categoryType)} rounded-2xl p-6 mb-6`}
        >
          <Text className="text-white text-xl font-display font-bold mb-4 text-center">
            {currentQuestion.question}
          </Text>

          {currentQuestion.image && (
            <View className="bg-white/20 rounded-xl p-4 mb-4 items-center">
              <Image
                source={currentQuestion.image}
                className="w-40 h-40"
                resizeMode="contain"
              />
            </View>
          )}
        </Animatable.View>

        {/* Answer Options */}
        <View className="mb-6">
          {currentQuestion.options.map((option, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={800}
              delay={index * 100}
            >
              <TouchableOpacity
                className={`p-4 rounded-xl mb-3 ${selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-secondary-500'
                    : 'bg-red-400'
                  : 'bg-white'
                  } shadow-sm`}
                onPress={() => !selectedAnswer && handleAnswer(option)}
                disabled={!!selectedAnswer}
              >
                <Text className={`text-lg text-center font-medium ${selectedAnswer === option ? 'text-white' : 'text-text'
                  }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>

        {/* Feedback */}
        {selectedAnswer && (
          <Animatable.View
            animation="fadeInUp"
            className={`p-4 rounded-xl ${selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-secondary-100 border border-secondary-300'
              : 'bg-red-100 border border-red-300'
              }`}
          >
            <Text className={`text-center text-lg font-medium ${selectedAnswer === currentQuestion.correctAnswer
              ? 'text-secondary-700'
              : 'text-red-700'
              }`}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? "✅ Correct! Well done!"
                : "❌ Incorrect. The correct answer is: " + currentQuestion.correctAnswer}
            </Text>
          </Animatable.View>
        )}
      </View>
    </SafeWrapper>
  );
};

export default QuizScreen;