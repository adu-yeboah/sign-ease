import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = "http://your-server-ip:8000/predict/";

export default function LiveScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [prediction, setPrediction] = useState('Waiting...');
    const [isStreaming, setIsStreaming] = useState(false);
    const cameraRef = useRef<Camera | null>(null);
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        socket.current = new WebSocket("ws://your-api-url/ws");

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrediction(data.prediction);
        };

        return () => socket.current?.close();
    }, []);

    const startStreaming = async () => {
        setIsStreaming(true);
        while (isStreaming) {
            await captureFrameAndSend();
            await new Promise((resolve) => setTimeout(resolve, 100)); // Send every 100ms
        }
    };

    const stopStreaming = () => {
        setIsStreaming(false);
    };
    const captureFrameAndSend = async () => {
        if (!cameraRef.current) return;
    
        const photo = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.5, // Reduce quality to 50% for speed
        });
    
        const formData = new FormData();
        formData.append("file", {
            uri: photo.uri,
            type: "image/jpeg",
            name: "frame.jpg",
        });
    
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            const data = await response.json();
            setPrediction(`${data.prediction} (${(data.confidence * 100).toFixed(1)}%)`);
        } catch (error) {
            console.error("Error sending frame:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Camera ref={cameraRef} style={styles.camera} type={facing} />
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
                    <Text style={styles.button}>Flip Camera</Text>
                </TouchableOpacity>
                {isStreaming ? (
                    <TouchableOpacity onPress={stopStreaming}>
                        <Text style={styles.button}>Stop</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={startStreaming}>
                        <Text style={styles.button}>Start</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.prediction}>{prediction}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    controls: { position: 'absolute', bottom: 50, flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
    button: { color: 'white', fontSize: 18, padding: 10, backgroundColor: 'blue' },
    prediction: { color: 'white', textAlign: 'center', fontSize: 20, marginTop: 20 },
});
