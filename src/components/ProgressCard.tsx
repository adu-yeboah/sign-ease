import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SignType } from '@/types/sign';

const ProgressCard: React.FC<{ sign: SignType }> = ({ sign }) => {
    const getCategoryColor = () => {
        switch (sign.category) {
            case 'alphabet': return 'bg-purple-100';
            case 'numbers': return 'bg-blue-100';
            case 'greetings': return 'bg-yellow-100';
            case 'animals': return 'bg-green-100';
            case 'food': return 'bg-red-100';
            case 'family': return 'bg-pink-100';
            case 'simple': return 'bg-orange-100';
            case 'actions': return 'bg-cyan-100';
            default: return 'bg-gray-100';
        }
    };

    const getCategoryIcon = () => {
        switch (sign.category) {
            case 'alphabet': 
                return <MaterialCommunityIcons name="alphabetical" size={16} color="#8B5CF6" />;
            case 'numbers': 
                return <MaterialCommunityIcons name="numeric" size={16} color="#3B82F6" />;
            case 'greetings': 
                return <Ionicons name="hand-left" size={16} color="#F59E0B" />;
            case 'animals': 
                return <Ionicons name="paw" size={16} color="#10B981" />;
            case 'food': 
                return <Ionicons name="fast-food" size={16} color="#EF4444" />;
            case 'family': 
                return <Ionicons name="people" size={16} color="#EC4899" />;
            case 'simple': 
                return <Ionicons name="color-palette" size={16} color="#F97316" />;
            case 'actions': 
                return <Ionicons name="walk" size={16} color="#06B6D4" />;
            default: 
                return <Ionicons name="help-circle" size={16} color="#6B7280" />;
        }
    };

    // Safe media handling
    const firstMedia = sign.media?.[0];
    const hasMedia = firstMedia !== undefined;

    return (
        <TouchableOpacity
            className={`p-4 rounded-xl mb-3 flex-row items-center ${getCategoryColor()}`}
            activeOpacity={0.8}
        >
            {/* Media Preview */}
            <View className="bg-white/80 p-2 rounded-lg mr-4">
                {hasMedia ? (
                    firstMedia.type === 'video' ? (
                        <View className="w-12 h-12 bg-black/10 rounded-lg items-center justify-center">
                            <Ionicons name="play-circle" size={24} color="#6B7280" />
                        </View>
                    ) : (
                        typeof firstMedia.uri === 'number' ? (
                            <Image 
                                source={firstMedia.uri} 
                                className="w-12 h-12" 
                                resizeMode="contain"
                            />
                        ) : (
                            <View className="w-12 h-12 bg-black/10 rounded-lg items-center justify-center">
                                <Ionicons name="image" size={24} color="#6B7280" />
                            </View>
                        )
                    )
                ) : (
                    <View className="w-12 h-12 bg-black/10 rounded-lg items-center justify-center">
                        <Ionicons name="image" size={24} color="#6B7280" />
                    </View>
                )}
            </View>

            {/* Sign Info */}
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">
                    {sign.name}
                </Text>
                <View className="flex-row items-center mt-1">
                    {getCategoryIcon()}
                    <Text className="text-sm text-gray-700 ml-2 capitalize">
                        {sign.category}
                    </Text>
                    {sign.difficulty && (
                        <Text className="text-xs text-gray-100 ml-2">
                             {sign.difficulty}
                        </Text>
                    )}
                </View>
            </View>

            {/* Learned Status */}
            {sign.learned ? (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            ) : (
                <Ionicons name="ellipse-outline" size={24} color="#9CA3AF" />
            )}
        </TouchableOpacity>
    );
};

export default ProgressCard;