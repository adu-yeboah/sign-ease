import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import ProgressCard from '../components/ProgressCard';
import SafeWrapper from '../components/ui/SafeWrapper';
import { useSign } from '@/hooks/useSign';
import { SignCategory } from '@/types/sign';

const ProgressScreen = () => {
    const { signs, progress, loading } = useSign();
    const [activeCategory, setActiveCategory] = useState<SignCategory | 'all'>('all');

    // Filter signs based on active category
    const filteredSigns = activeCategory === 'all'
        ? signs
        : signs.filter(sign => sign.category === activeCategory);

    // Calculate progress for current filter
    const learnedCount = filteredSigns.filter(sign => sign.learned).length;
    const totalCount = filteredSigns.length;
    const progressPercentage = totalCount > 0 ? (learnedCount / totalCount) * 100 : 0;

    const CATEGORIES: {
        id: SignCategory | 'all';
        name: string;
        icon: keyof typeof Ionicons.glyphMap;
        color: string;
    }[] = [
            { id: 'all', name: 'All', icon: 'list', color: '#8B5CF6' },
            { id: 'alphabet', name: 'ABCs', icon: 'calculator', color: '#8B5CF6' },
            { id: 'numbers', name: 'Numbers', icon: 'calculator', color: '#3B82F6' },
            { id: 'greetings', name: 'Greetings', icon: 'hand-left', color: '#F59E0B' },
            { id: 'food', name: 'Food', icon: 'fast-food', color: '#EF4444' },
            { id: 'simple', name: 'Simple', icon: 'color-palette', color: '#EC4899' },
            { id: 'actions', name: 'Actions', icon: 'walk', color: '#10B981' },
        ];

    const getCategoryColor = (category: SignCategory) => {
        switch (category) {
            case 'alphabet': return 'bg-accent-500';
            case 'numbers': return 'bg-blue-500';
            case 'greetings': return 'bg-yellow-500';
            case 'food': return 'bg-red-500';
            case 'simple': return 'bg-pink-500';
            case 'actions': return 'bg-green-500';
            default: return 'bg-accent-500';
        }
    };

    const getActiveCategoryColor = (category: SignCategory | 'all') => {
        return activeCategory === category ? getCategoryColor(category as SignCategory) : 'bg-gray-100';
    };

    const getActiveTextColor = (category: SignCategory | 'all') => {
        return activeCategory === category ? 'text-white' : 'text-gray-700';
    };

    if (loading) {
        return (
            <SafeWrapper>
                <View className="flex-1 items-center justify-center">
                    <Text>Loading progress...</Text>
                </View>
            </SafeWrapper>
        );
    }

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
            </View>

            {/* Category Tabs - Horizontal Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-6 py-1 max-h-20 mb-4"
                contentContainerStyle={{ paddingRight: 24 }}
            >
                <View className="flex-row gap-2">
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            className={`py-2 px-4 h-8 rounded-lg ${getActiveCategoryColor(category.id)}`}
                            onPress={() => setActiveCategory(category.id)}
                        >
                            <View className="flex-row items-center">
                                {
                                    category.id == "alphabet" ?
                                        (
                                            <MaterialCommunityIcons
                                                name="alphabetical"
                                                size={24}
                                                color={activeCategory === category.id ? 'white' : category.color}
                                                className="mr-1"
                                            />
                                        ) : (
                                            <Ionicons
                                                name={category.icon}
                                                size={16}
                                                color={activeCategory === category.id ? 'white' : category.color}
                                                className="mr-1"
                                            />)
                                }
                                <Text className={`text-sm font-medium capitalize ${getActiveTextColor(category.id)}`}>
                                    {category.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

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


            </View>

            {/* Signs List */}
            <FlatList
                data={filteredSigns}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Animatable.View
                        animation="fadeInUp"
                        duration={1000}
                    >
                        <ProgressCard sign={item} />
                    </Animatable.View>
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500">No signs found in this category</Text>
                    </View>
                }
                className='flex-1'
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 40,
                    flexGrow: 1
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeWrapper>
    );
};

export default ProgressScreen;