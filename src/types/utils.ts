import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ScreenWrapperProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  statusBarStyle?: 'light' | 'dark' | 'auto';
  backgroundColor?: string;
}

export type Sign = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  gifUrl?: string;
  category: 'alphabet' | 'simple' | 'advanced';
  learned?: boolean;
};

export type QuizQuestion = {
  signId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  image: any
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  SignList: { category: 'alphabet' | 'simple' | 'advanced' };
  SignDetail: { signId: string };
  Quiz: { categoryType: string };
  QuizDisplay: undefined;
  LiveQuiz:  { category: string };
  Notification: undefined;
};