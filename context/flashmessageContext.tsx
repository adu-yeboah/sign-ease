import React, { createContext, useContext, useState, ReactNode } from "react";
import FlashMessage from "../components/flashmessage";

interface FlashMessage {
  message: string;
  type: "success" | "error" | "info";
}

interface FlashMessageContextProps {
  flashMessage: FlashMessage | null;
  showFlashMessage: (
    message: string,
    type: "success" | "error" | "info",
    duration?: number
  ) => void;
}

const FlashMessageContext = createContext<FlashMessageContextProps | undefined>(
  undefined
);

export const FlashMessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const showFlashMessage = (
    message: string,
    type: "success" | "error" | "info",
    duration = 2000
  ) => {
    setFlashMessage({ message, type });
    setTimeout(() => setFlashMessage(null), duration);
  };

  return (
    <FlashMessageContext.Provider value={{ flashMessage, showFlashMessage }}>
      {children}
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onDismiss={() => setFlashMessage(null)}
        />
      )}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error(
      "useFlashMessage must be used within a FlashMessageProvider"
    );
  }
  return context;
};