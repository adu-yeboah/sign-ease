import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window")

export default function LiveScreen() {
    const navigation = useNavigation()

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        requestPermission()
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View className='flex-1'>
            <CameraView style={styles.camera} facing={facing}>
                {/* Nanigation */}
                <View className='flex-row justify-between w-full absolute top-10 px-containerPadding'>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>


                {/* Translation */}
                
                <ScrollView
                    style={styles.buttonContainer} className='bg-white absolute bottom-0 w-full h-2/5 rounded-3xl p-containerPadding'>

                    <TouchableOpacity className='p-padding4 flex-1 w-full'>
                        <MaterialCommunityIcons name="broom" size={34} color="black" className='mb-2' />

                    </TouchableOpacity>
                    <Text className='text-base'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus consequatur facilis ex nostrum suscipit? Vitae nihil doloribus nostrum neque, est incidunt dignissimos accusantium hic consectetur ratione molestias veritatis at natus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eos? Dolorum aut nisi, minus dolore numquam adipisci rem recusandae placeat cum molestias deserunt, minima officiis atque maxime expedita nostrum quibusdam!
                        Sed a voluptate ullam est, nulla explicabo accusamus hic? Itaque deleniti veniam rem totam numquam enim facilis doloremque nisi eius excepturi aliquam amet accusantium accusamus temporibus sunt, neque illum ipsum.
                        Reprehenderit, sunt hic in nihil molestias minima sit cupiditate dolores molestiae ducimus debitis, beatae quo. Obcaecati aperiam provident alias nihil. Accusamus dicta quos aperiam in nulla quae perspiciatis, ratione modi.
                        Reiciendis mollitia iste, nam eius omnis expedita autem enim consequuntur, suscipit cumque sapiente? Placeat reprehenderit maxime aliquam voluptates doloremque veniam ipsum, molestias nemo cupiditate perspiciatis quasi doloribus esse modi provident.
                        Voluptatum quae eveniet accusamus aperiam porro molestiae tempora ea reprehenderit ex provident neque sunt recusandae, architecto autem tenetur? Quas ipsam dignissimos eum tenetur dolor voluptates vel animi consequuntur. Qui, asperiores.
                        Dolores quisquam ad, id aliquam exercitationem tenetur natus fuga ipsum voluptas dicta doloremque doloribus vel a, nostrum impedit velit iusto, dignissimos architecto magni neque culpa debitis? Alias ea perspiciatis eos.
                        Ipsam minima corrupti deenim, illum facere suscipit distinctio earum. Amet sit sequi ex voluptate ut eaque quas ipsum quis esse.
                        Facilis cupiditate eveniet dolore aliquid eius ipsam placeat sed obcaecati voluptates ipsum, harum rerum minus cum voluptas quis eligendi omnis, ullam iusto, debitis exercitationem dolor quibusdam. Vitae quos odit aut?
                        Eveniet officia ea nemo architecto iure quis, omnis tenetur harum incidunt vel molestiae ipsam id excepturi sint, modi dicta minus totam cupiditate aspernatur dolorem placeat. Corrupti fugiat nam earum commodi.
                        Id ut, eaque quaerat velit accusamus assumenda suscipit eveniet consectetur in delectus provident rerum quos neque quia eligendi reprehenderit blanditiis accusantium tenetur nesciunt tempore consequatur laboriosam, temporibus perspiciatis voluptas. Itaque?
                    </Text>

                </ScrollView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        // flexDirection: 'row',

    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

});
