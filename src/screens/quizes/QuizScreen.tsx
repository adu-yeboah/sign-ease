// screens/quiz/QuizScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizCategory, QuizDifficulty } from '@/types/quiz';

type QuizScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Quiz'
>;

const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<QuizScreenNavigationProp>();
  const { category, difficulty } = route.params as {
    category: QuizCategory;
    difficulty?: QuizDifficulty;
  };

  const { questions, loading } = useQuiz(category, difficulty);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const getCategoryColor = () => {
    switch (category) {
      case 'alphabet':
        return 'bg-purple-500';
      case 'numbers':
        return 'bg-blue-500';
      case 'greetings':
        return 'bg-green-500';
      case 'animals':
        return 'bg-yellow-500';
      case 'food':
        return 'bg-red-500';
      case 'family':
        return 'bg-pink-500';
      case 'simple':
        return 'bg-indigo-500';
      case 'actions':
        return 'bg-orange-500';
      default:
        return 'bg-purple-500';
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const getMediaSource = (uri: any) => {
    if (typeof uri === 'string') {
      return uri; 
    }
    return uri; 
  };

  if (loading) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center">
          <Text>Loading quiz...</Text>
        </View>
      </SafeWrapper>
    );
  }

  if (quizCompleted) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center p-6">
          <Animatable.View
            animation="bounceIn"
            className={`${getCategoryColor()} rounded-2xl p-8 w-full items-center`}
          >
            <Text className="text-2xl font-bold text-white mb-4">
              Quiz Complete!
            </Text>

            {difficulty && (
              <View
                className={`${getDifficultyColor()} px-3 py-1 rounded-full mb-3`}
              >
                <Text className="text-white text-sm font-bold">
                  {difficulty.toUpperCase()}
                </Text>
              </View>
            )}

            <View className="bg-white/20 rounded-full px-6 py-4 mb-6">
              <Text className="text-white text-xl font-bold">
                {score}/{questions.length} Correct
              </Text>
            </View>

            <Text className="text-white text-center mb-6">
              {score === questions.length
                ? 'Perfect! 🎉'
                : score >= questions.length * 0.7
                ? 'Great job! 👍'
                : 'Keep practicing! 💪'}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white rounded-xl py-3 px-6 w-full items-center"
            >
              <Text
                className={`${getCategoryColor().replace('bg', 'text')} font-bold`}
              >
                Finish
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </SafeWrapper>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center">
          <Text>No questions available for this category</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mt-4 bg-purple-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white">Back to Categories</Text>
          </TouchableOpacity>
        </View>
      </SafeWrapper>
    );
  }

  // Set up video player only when media is video
  const player =
    currentQuestion?.media?.type === 'video'
      ? useVideoPlayer(getMediaSource(currentQuestion.media.uri), (p) => {
          p.loop = true;
          p.play();
        })
      : null;

  return (
    <SafeWrapper>
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          </TouchableOpacity>

          {difficulty && (
            <View className={`${getDifficultyColor()} px-3 py-1 rounded-full`}>
              <Text className="text-white text-sm font-bold">
                {difficulty.toUpperCase()}
              </Text>
            </View>
          )}

          <View className="w-6" />
        </View>

        {/* Progress */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-1">
            Question {currentIndex + 1}/{questions.length}
          </Text>
          <View className="h-2 bg-gray-200 rounded-full">
            <View
              className={`h-full rounded-full ${getCategoryColor()}`}
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Question */}
        <Animatable.View
          animation="fadeInUp"
          className={`${getCategoryColor()} rounded-2xl p-6 mb-6`}
        >
          <Text className="text-white text-xl font-bold mb-4 text-center">
            {currentQuestion.question}
          </Text>

          {currentQuestion.media && (
            <View className="bg-white/20 rounded-xl p-4 items-center justify-center mb-4">
              {currentQuestion.media.type === 'video' && player ? (
                <VideoView
                  player={player}
                  style={{ width: '100%', height: 160 }}
                  contentFit="contain"
                  allowsFullscreen
                  allowsPictureInPicture
                />
              ) : (
                <Image
                  source={getMediaSource(currentQuestion.media.uri)}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
              )}
            </View>
          )}
        </Animatable.View>

        {/* Options */}
        <View className="gap-2">
          {currentQuestion.options.map((option, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={2000}
              delay={index * 100}
            >
              <TouchableOpacity
                className={`p-4 rounded-xl ${
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-gray-100'
                }`}
                onPress={() => !selectedAnswer && handleAnswer(option)}
                disabled={!!selectedAnswer}
              >
                <Text
                  className={`text-center ${
                    selectedAnswer === option ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>

        {/* Explanation */}
        {selectedAnswer && currentQuestion.explanation && (
          <Animatable.View
            animation="fadeInUp"
            className="bg-blue-50 p-4 rounded-xl mt-4 border border-blue-200"
          >
            <Text className="text-blue-800">
              {currentQuestion.explanation}
            </Text>
          </Animatable.View>
        )}
      </View>
    </SafeWrapper>
  );
};

export default QuizScreen;
