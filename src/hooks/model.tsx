// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Camera, CameraType, CameraView } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import { decode } from 'base64-arraybuffer';  // Import to decode base64 strings
// import { icons } from '../../constants';

// export default function LiveScreen() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [model, setModel] = useState<any>(null);
//   const [prediction, setPrediction] = useState<string>('');
//   const cameraRef = useRef<Camera>(null);
//   const [facing, setFacing] = useState<CameraType>('back');

//   const imageSize = 128; // Input size for the model (make sure it matches the model's expected input size)

//   // Load TensorFlow Lite model
//   const loadModel = async () => {
//     await tf.ready(); // Wait for TensorFlow.js to initialize
//     const modelJSON = icons.model; // Use the appropriate path to the model file
//     const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJSON));
//     setModel(loadedModel);
//   };

//   // Request camera permissions
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//     loadModel(); // Load the model when the app starts
//   }, []);

//   // Preprocess camera frames
//   const preprocessImage = (base64Image: string) => {
//     // Decode the base64 image into an array buffer
//     const imageBuffer = decode(base64Image);
    
//     // Create an ImageData object (adjust size if needed)
//     const imageData = new ImageData(new Uint8ClampedArray(imageBuffer), imageSize, imageSize);

//     // Convert to tensor, resize and normalize
//     const tensorImage = tf.browser.fromPixels(imageData);
//     const resizedImage = tf.image.resizeBilinear(tensorImage, [imageSize, imageSize]);
//     const normalizedImage = resizedImage.div(255.0);  // Normalize pixel values to [0, 1]
//     return normalizedImage.expandDims(0);  // Add batch dimension
//   };

//   // Run predictions in real-time
//   const runModel = async () => {
//     if (!cameraRef.current || !model) console.log("not")

//     const frame = await cameraRef.current.takePictureAsync({ base64: true }); // Capture frame
//     const processedFrame = preprocessImage(frame.base64); // Preprocess image
//     const predictions = await model.predict(processedFrame); // Run model prediction

//     // Check the shape of the predictions to debug
//     console.log(predictions.shape);

//     // Assuming the model outputs an array of probabilities or logits
//     const predictedClassIndex = predictions.argMax(-1).dataSync()[0];
//     setPrediction(`Predicted class: ${predictedClassIndex}`);
//   };

//   // Run prediction every second
//   useEffect(() => {
//     if (model) {
//       const interval = setInterval(runModel, 1000); // Run model every 1 second
//       return () => clearInterval(interval); // Cleanup interval
//     }
//   }, [model]);

//   // Check if permission is granted
//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text>No access to camera</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         style={styles.camera}
//         facing={facing}
//         ref={cameraRef}
//       />
//       <View style={styles.overlay}>
//         <Text style={styles.prediction}>{prediction}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     width: 500,
//   },
//   prediction: {
//     fontSize: 20,
//     color: 'white',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
// });
