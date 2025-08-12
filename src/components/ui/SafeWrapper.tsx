import {
    View,
    SafeAreaView,
    Platform,
    StatusBar as RNStatusBar,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapperProps } from '@/types/utils';

export default function SafeWrapper({
    style,
    children,
    statusBarStyle = 'dark',
    backgroundColor = '#fff',
}: ScreenWrapperProps) {
    const WrapperComponent = Platform.OS === 'ios' ? SafeAreaView : View;

    return (
        <LinearGradient
            colors={['#fff', '#EDE9FE']} className="flex-1"
        >
            <StatusBar style={statusBarStyle} />
            <WrapperComponent
                style={[
                    {
                        flex: 1,
                        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
                    },
                    style,
                ]}
            >
                {children}
            </WrapperComponent>
        </LinearGradient>
    );
}