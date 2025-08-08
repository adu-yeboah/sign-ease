import { View, } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native';


export default function Splash() {
    return (
        <View className='flex-1 bg-splash justify-center items-center flex-col'>
            <Animatable.View
                duration={1600}
                animation="fadeInUp"
                className='mb-6'
            >
                <Image source={require("@assets/images/utils/logo-1.png")} className="h-[250px] w-[300px]" resizeMode='contain'/>
            </Animatable.View>

        </View>
    )
}