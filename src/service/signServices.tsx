import alphabetData from "@/data/alphabet";
import { SignType } from "@/types/sign";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Service {
    alphabet: SignType[] = alphabetData;

    public async loadSigns(): Promise<SignType[]> {
        try {
            const storedAlphabet = await AsyncStorage.getItem("alphabets");
            if (storedAlphabet) {
                this.alphabet = JSON.parse(storedAlphabet);
            } else {
                await AsyncStorage.setItem("alphabets", JSON.stringify(alphabetData));
                this.alphabet = alphabetData;
            }
            return this.alphabet;
        } catch (error) {
            console.error("Error loading alphabet from storage:", error);
            return alphabetData; 
        }
    }

    async signLearn(id: string): Promise<void> {
        try {
            const currentAlphabet = await this.loadSigns();
            const updatedSigns = currentAlphabet.map(s => {
                if (s.id === id) {
                    return { ...s, learned: true };
                }
                return s;
            });
            await AsyncStorage.setItem("alphabets", JSON.stringify(updatedSigns));
            this.alphabet = updatedSigns;
        } catch (error) {
            console.error("Error in signLearn:", error);
            throw error;
        }
    }
}


export const SignService = new Service();