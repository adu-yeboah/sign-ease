import { View, Text, Switch, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import SafeWrapper from '../components/ui/SafeWrapper'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Constants from "expo-constants";
import { useSign } from '@/hooks/useSign'

export default function Settings() {
    const navigation = useNavigation()
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [showClearConfirm, setShowClearConfirm] = useState(false)
    const { clearData } = useSign()

    const clearProgress = () => {
        clearData()
        setShowClearConfirm(false)
    }

    const openGithubRepo = () => {
        Linking.openURL('https://github.com/adu-yeboah/sign-ease')
    }

    const openPrivacyPolicy = () => {
        Linking.openURL('https://your-website.com/privacy')
    }

    return (
        <SafeWrapper>
            <View className="px-6 py-4">

                <View className='flex-row gap-3'>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="mb-6"
                    >
                        <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
                    </TouchableOpacity>

                    <Text className="text-2xl font-bold text-accent-700 font-display mb-8">Settings</Text>

                </View>
                {/* Notification Settings */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-accent-700 font-display mb-4">Preferences</Text>

                    <View className="flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm">
                        <View className="flex-row items-center">
                            <Ionicons name="notifications-outline" size={20} color="#6B7280" className="mr-3" />
                            <Text className="text-text">Enable Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* Clear Progress */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-accent-700 font-display mb-4">Data</Text>

                    <TouchableOpacity
                        className="flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm"
                        onPress={() => setShowClearConfirm(true)}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="trash-outline" size={20} color="red" className="mr-3" />
                            <Text className="text-text">Clear All Progress</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    {showClearConfirm && (
                        <View className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                            <Text className="text-text mb-4">Are you sure you want to clear all your progress? This cannot be undone.</Text>
                            <View className="flex-row justify-end gap-2">
                                <TouchableOpacity onPress={() => setShowClearConfirm(false)}>
                                    <Text className="text-accent-700 font-medium">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={clearProgress}>
                                    <Text className="text-red-600 font-medium">Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* About Section */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-accent-700 font-display mb-4">About</Text>

                    <TouchableOpacity
                        className="flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm mb-3"
                        onPress={() => navigation.navigate('Home' as never)}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="information-circle-outline" size={20} color="#6B7280" className="mr-3" />
                            <Text className="text-text">About App</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm mb-3"
                        onPress={openGithubRepo}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="logo-github" size={20} color="#6B7280" className="mr-3" />
                            <Text className="text-text">GitHub Repository</Text>
                        </View>
                        <Ionicons name="open-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row justify-between items-center bg-white rounded-xl p-4 shadow-sm"
                        onPress={openPrivacyPolicy}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" className="mr-3" />
                            <Text className="text-text">Privacy Policy</Text>
                        </View>
                        <Ionicons name="open-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                {/* App Version */}
                <View className="items-center mt-8">
                    <Text className="text-gray-500">
                         Version {Constants.systemVersion ?? "Unknown"}
                    </Text>
                </View>
            </View>
        </SafeWrapper>
    )
}