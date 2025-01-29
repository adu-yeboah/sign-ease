import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const { width, height } = Dimensions.get("window");

export default function LiveScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [model, setModel] = useState<tf.GraphModel | null>(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadModel = async () => {
            await tf.ready();
            const modelJSON = require('../../assets/model/model.json');
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
        return (
            <View style={styles.permissionContainer}>
                <Text>Camera permission is required to use this feature.</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={facing}>
                <View style={styles.navigation}>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <Text style={{ color: 'white' }}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.buttonContainer}>
                {loading ? (
                    <Text>Loading model...</Text>
                ) : (
                    <Text>{prediction ? `Prediction: ${prediction}` : 'No prediction available.'}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    navigation: { position: 'absolute', top: 10, left: 10 },
    permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonContainer: { backgroundColor: 'white', padding: 20 },
});
