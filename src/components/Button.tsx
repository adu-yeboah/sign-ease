import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

interface AnimatedButtonProps {
  title: string;
  description?: string;
  onPress: () => void;
  animation?: string;
  duration?: number;
  iterationCount?: number | 'infinite';
  className?: string;
  icon?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  description,
  onPress,
  animation = 'fadeInUp',
  duration = 1000,
  iterationCount,
  className = '',
  icon,
}) => {
  return (
    <Animatable.View 
      animation={animation} 
      duration={duration}
      iterationCount={iterationCount}
      className="w-full"
    >
      <TouchableOpacity
        className={`py-4 px-5 rounded-xl flex-row items-center ${className}`}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {icon && (
          <View className="mr-4 bg-white/20 p-3 rounded-full">
            <Ionicons 
              name={icon} 
              size={22} 
              color="white" 
            />
          </View>
        )}
        
        <View className="flex-1">
          <Text className="text-white text-lg font-bold font-display">
            {title}
          </Text>
          {description && (
            <Text className="text-white/80 text-sm mt-1">
              {description}
            </Text>
          )}
        </View>
        
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color="white" 
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default AnimatedButton;