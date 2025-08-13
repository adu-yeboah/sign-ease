import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import Header from '@/components/ui/Header';
import * as Animatable from 'react-native-animatable';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { QuizCategory } from '@/types/quiz';

type QuizDisplayNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizDisplay'>;

const quizCategories = [
    {
        id: 'alphabet',
        title: 'Alphabet Quiz',
        icon: 'alphabet-outline',
        color: 'bg-purple-500',
        description: 'Test your knowledge of sign language letters',
        difficulties: ['easy', 'medium', 'hard']
    },
    {
        id: 'numbers',
        title: 'Numbers Quiz',
        icon: 'calculator-outline',
        color: 'bg-blue-500',
        description: 'Practice numbers in sign language',
        difficulties: ['easy', 'medium']
    },
    {
        id: 'greetings',
        title: 'Greetings Quiz',
        icon: 'chatbubbles-outline',
        color: 'bg-green-500',
        description: 'Common greeting signs',
        difficulties: ['easy']
    },
    {
        id: 'animals',
        title: 'Animals Quiz',
        icon: 'paw-outline',
        color: 'bg-yellow-500',
        description: 'Identify animal signs',
        difficulties: ['easy', 'medium', 'hard']
    },
    {
        id: 'food',
        title: 'Food Quiz',
        icon: 'fast-food-outline',
        color: 'bg-red-500',
        description: 'Food-related signs',
        difficulties: ['easy', 'medium']
    },
    {
        id: 'family',
        title: 'Family Quiz',
        icon: 'people-outline',
        color: 'bg-pink-500',
        description: 'Family member signs',
        difficulties: ['medium']
    },
    {
        id: 'Simple',
        title: 'Simple Signs Quiz',
        icon: 'color-palette-outline',
        color: 'bg-indigo-500',
        description: 'Color signs',
        difficulties: ['easy']
    },
    {
        id: 'actions',
        title: 'Actions Quiz',
        icon: 'walk-outline',
        color: 'bg-orange-500',
        description: 'Action and verb signs',
        difficulties: ['medium', 'hard']
    },
] as const;

const DisplayQuiz = () => {
    const navigation = useNavigation<QuizDisplayNavigationProp>();

    const handleCategoryPress = (category: QuizCategory, difficulty?: string) => {
        navigation.navigate('Quiz', { category, difficulty });
    };

    const handleLiveQuizPress = () => {
        alert('Live Quiz feature is coming soon!');
    };

    return (
        <SafeWrapper>
            <Header title="Sign Language Quiz" />
            <ScrollView className="px-5 pb-10">
                {quizCategories.map((category, index) => (
                    <Animatable.View
                        key={category.id}
                        animation="fadeInUp"
                        duration={800}
                        delay={index * 150}
                        className="bg-white rounded-xl p-5 mb-5 shadow-sm"
                    >
                        <View className="flex-row items-center mb-3">
                            <View className={`${category.color} p-3 rounded-full mr-3`}>
                                {
                                    category.id == "alphabet" ? <MaterialCommunityIcons name="alphabetical" size={24} color="white" /> : <Ionicons name={category.icon} size={24} color="white" />
                                }
                            </View>
                            <Text className="text-xl font-semibold text-gray-700">
                                {category.title}
                            </Text>
                        </View>
                        <Text className="text-sm text-gray-600 mb-4 leading-5">
                            {category.description}
                        </Text>

                        {/* Difficulty Selector */}
                        <View className="flex-row flex-wrap gap-2 mb-4">
                            {category.difficulties.map((difficulty) => (
                                <TouchableOpacity
                                    key={difficulty}
                                    onPress={() => handleCategoryPress(category.id as QuizCategory, difficulty)}
                                    className={`px-3 py-1 rounded-full ${difficulty === 'easy'
                                            ? 'bg-green-100 border border-green-300'
                                            : difficulty === 'medium'
                                                ? 'bg-yellow-100 border border-yellow-300'
                                                : 'bg-red-100 border border-red-300'
                                        }`}
                                >
                                    <Text className={
                                        difficulty === 'easy'
                                            ? 'text-green-800'
                                            : difficulty === 'medium'
                                                ? 'text-yellow-800'
                                                : 'text-red-800'
                                    }>
                                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Disabled Live Quiz Button */}
                        <TouchableOpacity
                            className="rounded-xl bg-gray-300 py-3 px-4 items-center"
                            onPress={handleLiveQuizPress}
                            disabled
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="radio-outline" size={20} color="gray" />
                                <Text className="text-gray-600 font-bold ml-2">
                                    Live Quiz (Coming Soon)
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                ))}
            </ScrollView>
        </SafeWrapper>
    );
};

export default DisplayQuiz;