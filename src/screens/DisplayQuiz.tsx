import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeWrapper from '@/components/ui/SafeWrapper'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import Header from '@/components/ui/Header';
import * as Animatable from 'react-native-animatable';

type QuizCategory = {
    id: string;
    title: string;
    description: string;
    type: 'alphabet' | 'simple' | 'advanced';
    label: string;
};

export default function DisplayQuiz() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const quizCategories: QuizCategory[] = [
        {
            id: '1',
            title: 'Alphabets',
            description: 'Learn and practice sign language for each alphabet letter',
            type: 'alphabet',
            label: 'Alphabets'
        },
        {
            id: '2',
            title: 'Simple Words',
            description: 'Basic everyday words and phrases in sign language',
            type: 'simple',
            label: 'Simple Words'
        },
        {
            id: '3',
            title: 'Advanced Words',
            description: 'Complex words and expressions for more proficient users',
            type: 'advanced',
            label: 'Advanced Words'
        }
    ];

    const handleCategoryPress = (category: QuizCategory) => {
        navigation.navigate('Quiz', {
            categoryType: category.type
        });
    };

    const handleLiveQuizPress = (categoryType: QuizCategory['type']) => {
        navigation.navigate('LiveQuiz', { category: categoryType });
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Alphabets': return 'bg-accent-500';
            case 'Simple Words': return 'bg-primary-500';
            case 'Advanced Words': return 'bg-secondary-500';
            default: return 'bg-accent-500';
        }
    };

    return (
        <SafeWrapper>
            <ScrollView className="px-5 pb-10">
               <Header title={'Sign Quiz'} />

                {quizCategories.map((category) => (
                    <Animatable.View 
                    animation={"fadeInUp"}
                    duration={1000}
                    key={category.id} className="bg-white rounded-xl p-5 mb-5 shadow-sm shadow-black/10">
                        <Text className="text-xl font-semibold text-gray-700 mb-2">{category.label}</Text>
                        <Text className="text-sm text-gray-600 mb-4 leading-5">{category.description}</Text>

                        <View className="flex-col justify-between gap-2">
                            <TouchableOpacity
                                onPress={() => handleCategoryPress(category)}
                                className={`w-full rounded-2xl py-4 ${getCategoryColor(category.title)} justify-center px-4`}>
                                <Text className='text-xl text-white'>
                                    Practice Signs
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="rounded-lg bg-red-400 p-2 w-5/4"
                                onPress={() => handleLiveQuizPress(category.type)}
                            >
                                <Text className="text-white text-center font-medium">Live Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                ))}
            </ScrollView>
        </SafeWrapper>
    )
}