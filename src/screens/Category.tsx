import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import { useSign } from '@/hooks/useSign';
import SafeWrapper from '@/components/ui/SafeWrapper';
import { SignCategory } from '@/types/sign';
import SignCard from '@/components/SignCard';
import { Ionicons } from '@expo/vector-icons';

type CategoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Category'
>;

const CategoryScreen = () => {
  const navigation = useNavigation<CategoryScreenNavigationProp>();
  const route = useRoute();
  const { category } = route.params as { category: SignCategory };
  const { getSignsByCategory } = useSign();
  const signs = getSignsByCategory(category);

  const getCategoryColor = () => {
    switch (category) {
      case 'alphabet': return 'bg-purple-500';
      case 'numbers': return 'bg-blue-500';
      case 'animals': return 'bg-green-500';
      case 'food': return 'bg-red-500';
      case 'greetings': return 'bg-yellow-500';
      case 'family': return 'bg-pink-500';
      case 'simple': return 'bg-indigo-500';
      case 'actions': return 'bg-orange-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
        <View className="w-6" />
      </View>

      {/* Sign Grid */}
      <FlatList
        data={signs}
        renderItem={({ item }) => (
          <SignCard 
            sign={item} 
            categoryColor={getCategoryColor()} 
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingBottom: 20
        }}
        columnWrapperStyle={{ 
          justifyContent: 'space-between',
          marginBottom: 8
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-gray-500 text-center">
              No signs found in this category.
            </Text>
          </View>
        }
      />
    </SafeWrapper>
  );
};

export default CategoryScreen;