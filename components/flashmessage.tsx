import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface FlashMessageProps {
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void; // Callback to handle dismiss action
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  type,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <View style={[styles.container, styles[type]]}>
      <Icon
        name={
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "times-circle"
            : "info-circle"
        }
        size={20}
        color="white"
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50, // Set the top position
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 5,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to start
  },
  success: {
    backgroundColor: "#4CAF50", // Green
  },
  error: {
    backgroundColor: "#F44336", // Red
  },
  info: {
    backgroundColor: "#2196F3", // Blue
  },
  message: {
    color: "#fff",
    textAlign: "center",
    marginLeft: 10, // Add some space between the icon and message
  },
});

export default FlashMessage;
