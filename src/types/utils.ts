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



export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Category: {category: string};
  SignList: { category: 'alphabet' | 'simple' | 'advanced' };
  SignDetail: { signId: string };
  Quiz: { category: string, difficulty: string | undefined };
  QuizDisplay: undefined;
  LiveQuiz:  { category: string };
  DailyChallenge: undefined;
  Settings: undefined;
  SignDetailVideo: { signId: string };
};