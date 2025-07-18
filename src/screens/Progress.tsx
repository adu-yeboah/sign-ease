import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import ProgressCard from '../components/ProgressCard';
import { Sign } from '../types/utils';
import signsData from '../data/sign.json';
import SafeWrapper from '../components/ui/SafeWrapper';

const ProgressScreen = () => {
    // In a real app, you would track progress in state or context
    const progressSigns = signsData.map((sign: any) => ({
        ...sign,
        learned: Math.random() > 0.5, // Randomly mark as learned for demo
    }));

    const learnedCount = progressSigns.filter(sign => sign.learned).length;
    const totalCount = progressSigns.length;
    const progressPercentage = (learnedCount / totalCount) * 100;

    // Group signs by category
    const categories = {
        alphabet: progressSigns.filter(sign => sign.category === 'alphabet'),
        simple: progressSigns.filter(sign => sign.category === 'simple'),
        advanced: progressSigns.filter(sign => sign.category === 'advanced'),
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'alphabet': return 'bg-accent-500';
            case 'simple': return 'bg-primary-500';
            case 'advanced': return 'bg-secondary-500';
            default: return 'bg-accent-500';
        }
    };

    return (
        <SafeWrapper>
                {/* Header */}
                <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
                    <View className="flex-row items-center">
                        <Ionicons name="trophy" size={24} color="#8B5CF6" />
                        <Text className="text-2xl font-bold text-accent-700 font-display ml-2">
                            Your Progress
                        </Text>
                    </View>
                    <View className="w-6" /> {/* Spacer for alignment */}
                </View>

                <View className="px-6">
                    {/* Progress Summary */}
                    <Animatable.View
                        animation="fadeInUp"
                        duration={600}
                        className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
                    >
                        <Text className="text-xl font-bold text-accent-700 font-display mb-4 text-center">
                            {progressPercentage.toFixed(0)}% Complete
                        </Text>
                        <Text className="text-text text-center mb-4">
                            You've learned {learnedCount} of {totalCount} signs
                        </Text>

                        <View className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <View
                                className="h-full rounded-full"
                                style={{
                                    width: `${progressPercentage}%`,
                                    backgroundColor: progressPercentage >= 75
                                        ? '#10B981'
                                        : progressPercentage >= 50
                                            ? '#3B82F6'
                                            : '#8B5CF6'
                                }}
                            />
                        </View>
                        <Text className="text-xs text-gray-500 text-right">
                            {progressPercentage.toFixed(0)}%
                        </Text>
                    </Animatable.View>

                    {/* Category Progress */}
                    <Animatable.View
                        animation="fadeInUp"
                        duration={800}
                        className="flex-row justify-between mb-6"
                    >
                        {Object.entries(categories).map(([category, signs]) => {
                            const learned = signs.filter(s => s.learned).length;
                            const total = signs.length;
                            const percent = total > 0 ? (learned / total) * 100 : 0;

                            return (
                                <View key={category} className="items-center flex-1">
                                    <View className={`${getCategoryColor(category)} w-12 h-12 rounded-xl items-center justify-center mb-2`}>
                                        <Text className="text-white font-bold">
                                            {percent.toFixed(0)}%
                                        </Text>
                                    </View>
                                    <Text className="text-xs text-center text-accent-700 capitalize">
                                        {category}
                                    </Text>
                                </View>
                            );
                        })}
                    </Animatable.View>
                </View>

                {/* Signs List */}
                <FlatList
                    data={progressSigns}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Animatable.View
                            animation="fadeInUp"
                            duration={1000}
                        >
                            <ProgressCard sign={item} />
                        </Animatable.View>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 40
                    }}
                    showsVerticalScrollIndicator={false}
                />
        </SafeWrapper>

    );
};

export default ProgressScreen;