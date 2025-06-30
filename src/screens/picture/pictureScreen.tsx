import { useState, useRef } from "react";
import {
    StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFlashMessage } from "../../context/flashmessageContext";
import * as ImageManipulator from 'expo-image-manipulator'; // 

const API_URL = "https://sign-ease-backend.onrender.com/predict/";

export default function PictureScreen() {
    const { showFlashMessage } = useFlashMessage();
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState<CameraType>("back");
    const [imageUri, setImageUri] = useState(null);
    const [prediction, setPrediction] = useState("Waiting...");
    const [isLoading, setIsLoading] = useState(false);
    const cameraRef = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.centeredView}>
                <Text style={styles.permissionText}>We need camera permission</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
            setImageUri(photo.uri);
        } catch (error) {
            showFlashMessage("Failed to capture image", "error");
        }
    };

    const resizeImage = async (uri : string) => {
        const resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 128, height: 128 } }], // Resize to 128x128
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Optional: Compress and set format
        );
        return resizedImage.uri; // Return the URI of the resized image
    };

    const sendPicture = async () => {
        if (!imageUri) {
            showFlashMessage("No image to send", "error");
            return;
        }
        setIsLoading(true);

        try {
            // Resize the image to 128x128
            const resizedImageUri = await resizeImage(imageUri);
            console.log("Resized Image URI:", resizedImageUri);

            const formData = new FormData();
            formData.append("file", {
                uri: resizedImageUri,
                type: "image/jpeg",
                name: "photo.jpg",
            } as any);


            const response = await axios.post(API_URL, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                timeout: 10000,
            });

            console.log("response", response);
            
            const { prediction, confidence } = response.data;
            setPrediction(`${prediction} (${(confidence * 100).toFixed(1)}%)`);
        } catch (error) {
            let errorMessage = "Failed to get prediction";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
                console.error("Axios Error Details:", error.response?.data);
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            showFlashMessage(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={cameraType}>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={takePicture} style={styles.button}>
                        <MaterialIcons name="camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendPicture} style={styles.button} disabled={isLoading}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

            {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

            {isLoading ? (
                <ActivityIndicator size="large" color="blue" style={styles.loading} />
            ) : (
                <Text style={styles.predictionText}>{prediction}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DFDADA" },
    camera: { width: "100%", height: "60%" },
    controls: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
    button: { backgroundColor: "blue", padding: 10, margin: 5, borderRadius: 5 },
    buttonText: { color: "white", fontSize: 16 },
    preview: { width: 128, height: 128, marginTop: 10, borderRadius: 10 },
    permissionText: { fontSize: 18, textAlign: "center" },
    centeredView: { flex: 1, justifyContent: "center", alignItems: "center" },
    loading: { marginTop: 20 },
    predictionText: { fontSize: 18, marginTop: 20, textAlign: "center" },
});