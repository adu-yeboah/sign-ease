import { useState, useEffect, useRef } from "react";
import {
    StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Animated, PanResponder
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from "axios";
import { useFlashMessage } from "../../context/flashmessageContext";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://sign-ease-backend.onrender.com/predict/";
const WS_URL = "wss://sign-ease-backend.onrender.com/ws";

export default function LiveScreen() {
    const { showFlashMessage } = useFlashMessage();
    const navigate = useNavigation()
    const [facing, setFacing] = useState<CameraType>("front");
    const [prediction, setPrediction] = useState("Waiting...");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lastPrediction, setLastPrediction] = useState("");

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const socket = useRef<WebSocket | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const translationY = useRef(new Animated.Value(0)).current; 
    const isVisible = useRef(true); 

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);

    useEffect(() => {
        socket.current = new WebSocket(WS_URL as unknown as string);

        socket.current.onopen = () => console.log("WebSocket Connected");
        socket.current.onmessage = (event) => {
            const { prediction, confidence } = JSON.parse(event.data);
            const newPrediction = `${prediction} (${(confidence * 100).toFixed(1)}%)`;

            if (newPrediction !== lastPrediction) {
                setPrediction(newPrediction);
                setLastPrediction(newPrediction);
            }
        };
        socket.current.onerror = (error) => console.log("WebSocket Error:", error);
        socket.current.onclose = () => console.log("WebSocket Disconnected");

        return () => socket.current?.close();
    }, [lastPrediction]);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const startStreaming = () => {
        if (!cameraRef.current) {
            showFlashMessage("Camera not ready", "error");
            return;
        }
        setIsStreaming(true);
        setIsLoading(true);
        intervalRef.current = setInterval(captureFrameAndSend, 500); 
    };

    const stopStreaming = () => {
        setIsStreaming(false);
        setIsLoading(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const captureFrameAndSend = async () => {
        if (!cameraRef.current || !isStreaming) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.5,
            });

            if (!photo?.uri) {
                showFlashMessage("Camera capture failed", "error");
                return;
            }

            const formData = new FormData();
            formData.append("file", {
                uri: photo.uri,
                type: "image/jpeg",
                name: "frame.jpg",
            } as any);

            const response = await axios.post(API_URL, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                timeout: 10000,
            });
            console.log(response.data);

            const { prediction, confidence } = response.data;
            const newPrediction = `${prediction} (${(confidence * 100).toFixed(1)}%)`;

            if (newPrediction !== lastPrediction) {
                setPrediction(newPrediction);
                setLastPrediction(newPrediction);
            }
            setIsLoading(false);
        } catch (error: any) {
            let errorMessage = "An unknown error occurred";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            showFlashMessage(errorMessage, "error");
            console.log(errorMessage);

            setIsLoading(false);
        }
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
        onPanResponderMove: (_, gestureState) => {
            translationY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 50) {
                // Swipe down → Hide
                isVisible.current = false;
                Animated.timing(translationY, {
                    toValue: 300, // Move it off-screen
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else if (gestureState.dy < -50) {
                // Swipe up → Show
                isVisible.current = true;
                Animated.timing(translationY, {
                    toValue: 0, // Move back into view
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                // If the swipe is not significant, reset the position
                Animated.spring(translationY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    if (!permission?.granted) {
        return (
            <View style={styles.centeredView}>
                <Text style={styles.permissionText}>
                    {permission ? "We need camera permission" : "Checking permissions..."}
                </Text>
                {!permission && (
                    <TouchableOpacity onPress={requestPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Grant Permission</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigate.goBack()} className="p-2 bg-grey1 rounded-full items-center justify-center">
                        <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Animated.View
                    style={[styles.translationContainer, { transform: [{ translateY: translationY }] }]}
                    {...panResponder.panHandlers}
                >
                    <View className="w-full flex flex-row justify-between items-center">
                        <TouchableOpacity
                            style={[styles.clearButton, isStreaming ? styles.disabledButton : {}]}
                            onPress={startStreaming}
                            disabled={isStreaming}
                        >
                            <MaterialIcons name="stream" size={24} color={isStreaming ? "gray" : "black"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearButton} onPress={stopStreaming}>
                            <FontAwesome name="stop" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : (
                        <Text style={styles.predictionText}>{prediction}</Text>
                    )}
                </Animated.View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        top: 40,
        paddingHorizontal: 20,
    },
    translationContainer: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "40%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    clearButton: { padding: 10 },
    disabledButton: { opacity: 0.5 },
    predictionText: { fontSize: 18, textAlign: "center", marginTop: 10 },
    centeredView: { flex: 1, justifyContent: "center", alignItems: "center" },
    permissionText: { color: "white", fontSize: 18, textAlign: "center", marginBottom: 20 },
    button: { backgroundColor: "blue", padding: 10, borderRadius: 10 },
    buttonText: { color: "white", fontSize: 18, textAlign: "center" },
});