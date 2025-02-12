import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 px-containerPadding'>
                {/* Header */}
                <View className='flex-row justify-between items-center mt-padding5'>
                    <Text className='text-black text-h2 font-ALmendra_SC'>sign-ease</Text>
                    <TouchableOpacity>
                        <Image source={icons.menu} className='h-10 w-10' />
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View className='flex-col gap-6 mt-padding1 w-full py-padding3'>

                    {/* Live Translation */}
                    <TouchableOpacity className="flex-row gap-3 justify-between relative w-full overflow-hidden bg-primary rounded-lg p-padding3"  onPress={() => navigation.navigate('Live' as never)}>
                        <Image source={icons.video} className="w-2/5" /> 
                        <View className="flex-1 flex-col gap-2">
                            <Text className="font-Kanit text-h3 w-full" numberOfLines={1}>
                                live translation
                            </Text>
                            <Text className="font-Roboto text-base w-full flex-shrink" numberOfLines={4} ellipsizeMode="tail">
                                get live sign-language translation for easy communication
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Picture Translation */}
                    <TouchableOpacity className="flex-row gap-5 justify-between relative w-full overflow-hidden bg-primary rounded-lg p-padding3" onPress={() => navigation.navigate('Picture' as never)}>
                        <Image source={icons.pic} className="w-2/5" /> 
                        <View className="flex-1 flex-col gap-2">
                            <Text className="font-Kanit text-h3 w-full" numberOfLines={1}>
                                picture translation
                            </Text>
                            <Text className="font-Roboto text-base w-full flex-shrink" numberOfLines={4} ellipsizeMode="tail">
                                get picture-based sign-language translation for easy communication
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}
