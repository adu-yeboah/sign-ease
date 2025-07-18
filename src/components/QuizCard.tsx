import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { QuizQuestion } from '../types/utils';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  return (
    <Animatable.View 
      animation="fadeInUp"
      duration={800}
      className="bg-white rounded-xl p-6 mb-6 shadow-md"
    >
      <Text className="text-xl font-bold text-accent mb-6 text-center">
        {question.question}
      </Text>
      
      <View className="space-y-4">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`p-4 rounded-lg items-center ${
              selectedAnswer === option
                ? option === correctAnswer
                  ? 'bg-button'
                  : 'bg-red-500'
                : 'bg-gray-200'
            }`}
            onPress={() => !selectedAnswer && onAnswer(option)}
            disabled={!!selectedAnswer}
          >
            <Text className="text-lg">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedAnswer && (
        <Animatable.Text 
          animation="fadeInUp"
          className={`text-lg font-bold mt-4 text-center ${
            selectedAnswer === correctAnswer ? 'text-button' : 'text-red-500'
          }`}
        >
          {selectedAnswer === correctAnswer
            ? "✅ Correct! Great job!"
            : "❌ Oops! Try again next time!"}
        </Animatable.Text>
      )}
    </Animatable.View>
  );
};

export default QuizCard;