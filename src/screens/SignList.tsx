import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SignCard from '../components/SignCard';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import { useSign } from '@/hooks/useSign';

type SignListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignList'>;

const SignListScreen = () => {
  const { alphabet }  = useSign()
  
  const route = useRoute<any>();
  const navigation = useNavigation<SignListNavigationProp>();
  const { category } = route.params;

 const data = React.useMemo(() => {
    try {
      switch (category) {
        case 'alphabet': return alphabet;
        case 'simple': return []; 
        case 'advanced': return []; 
        default: return [];
      }
    } catch (error) {
      console.error("Error filtering data:", error);
      return [];
    }
  }, [alphabet]);

  const getCategoryColor = () => {
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
      <View className="flex-row justify-between items-center px-6 bg pt-4 pb-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-accent-700 font-display">
          {category.charAt(0).toUpperCase() + category.slice(1)} Signs
        </Text>
        <View className="w-6" />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SignCard sign={item} categoryColor={getCategoryColor()} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeWrapper>
  );
};

export default SignListScreen;