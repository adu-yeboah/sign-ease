import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sign } from '../types/utils';

const ProgressCard: React.FC<{ sign: Sign }> = ({ sign }) => {
    const getCategoryColor = () => {
        switch(sign.category) {
            case 'alphabet': return 'bg-accent-100';
            case 'simple': return 'bg-primary-100';
            case 'advanced': return 'bg-secondary-100';
            default: return 'bg-accent-100';
        }
    };

    return (
        <TouchableOpacity 
            className={`p-4 rounded-xl mb-3 flex-row items-center ${getCategoryColor()}`}
            activeOpacity={0.8}
        >
            <View className="bg-white/80 p-2 rounded-lg mr-4">
                <Image 
                    source={{ uri: sign.imageUrl }} 
                    className="w-12 h-12" 
                    resizeMode="contain"
                />
            </View>
            
            <View className="flex-1">
                <Text className="text-lg font-bold text-accent-700">
                    {sign.name}
                </Text>
                <Text className="text-sm text-accent-500 capitalize">
                    {sign.category} sign
                </Text>
            </View>
            
            {sign.learned ? (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            ) : (
                <Ionicons name="ellipse-outline" size={24} color="#9CA3AF" />
            )}
        </TouchableOpacity>
    );
};

export default ProgressCard;