import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const { width, height } = Dimensions.get("window");

export default function LiveScreen() {
    const navigation = useNavigation();

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(true);

    // Load the TensorFlow Lite model
    useEffect(() => {
        const loadModel = async () => {
            await tf.ready();
            const modelJSON = require('../../assets/model/alphabet_model.tflite');
            const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJSON));
            setModel(loadedModel);
            setLoading(false);
        };

        loadModel();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        requestPermission();
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleFrame = async (frame: any) => {
        if (!model || loading) return;

        // Preprocess the frame
        const preprocessImage = async (image: any) => {
            const resizedImage = tf.image.resizeBilinear(image, [128, 128]);
            const normalizedImage = resizedImage.div(255.0);
            return normalizedImage.expandDims(0);
        };

        const imageTensor = await preprocessImage(frame);

        // Get prediction
        const predictions = model.predict(imageTensor);
        const predictionArray = predictions.dataSync();
        const predictedIndex = predictionArray.indexOf(Math.max(...predictionArray));
        const predictedSign = mapIndexToSign(predictedIndex); // Replace this with your mapping logic
        setPrediction(predictedSign);
    };

    const mapIndexToSign = (index: string | number) => {
        // Replace this with your actual class mapping
        const classMap = {
            0: 'A',
            1: 'B',
            2: 'C',
            // Add the rest of the mappings
        };
        return classMap[index] || 'Unknown';
    };

    return (
        <View className='flex-1'>
            <CameraView style={styles.camera} facing={facing}>
                {/* Navigation */}
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
                    style={styles.buttonContainer}
                    className='bg-white absolute bottom-0 w-full h-2/5 rounded-3xl p-containerPadding'
                >
                    <TouchableOpacity className='p-padding4 flex-1 w-full'>
                        <MaterialCommunityIcons name="broom" size={34} color="black" className='mb-2' />
                    </TouchableOpacity>

                    {loading ? (
                        <Text className='text-base'>Loading model...</Text>
                    ) : (
                        <Text className='text-base'>
                            {prediction ? `Prediction: ${prediction}` : 'No prediction available.'}
                        </Text>
                    )}
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
