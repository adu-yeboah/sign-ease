import alphabetData from "@/data/alphabet";
import { simpleData } from "@/data/simple";
import { SignType } from "@/types/sign";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoadSigns {
    salphabet: SignType[];
    ssimple: SignType[];
}

class Service {
    alphabet: SignType[] = alphabetData;
    simple: SignType[] = simpleData;

    public async loadSigns(): Promise<LoadSigns> {
        try {
            const storedAlphabet = await AsyncStorage.getItem("alphabets");
            const storedSimple = await AsyncStorage.getItem("simple");

            this.alphabet = storedAlphabet ? JSON.parse(storedAlphabet) : alphabetData;
            this.simple = storedSimple ? JSON.parse(storedSimple) : simpleData;

            if (!storedAlphabet) {
                await AsyncStorage.setItem("alphabets", JSON.stringify(this.alphabet));
            }
            if (!storedSimple) {
                await AsyncStorage.setItem("simple", JSON.stringify(this.simple));
            }

            return { salphabet: this.alphabet, ssimple: this.simple };
        } catch (error) {
            console.error("Error loading alphabet from storage:", error);
            return { salphabet: alphabetData, ssimple: simpleData };
        }
    }

    public async signLearn(id: string, category: string): Promise<void> {
        try {
            let updatedSigns: SignType[] = [];

            if (category === "alphabet") {
                updatedSigns = this.alphabet.map(s =>
                    s.id === id ? { ...s, learned: true } : s
                );
                await AsyncStorage.setItem("alphabets", JSON.stringify(updatedSigns));
                this.alphabet = updatedSigns;
            } else if (category === "simple") {
                updatedSigns = this.simple.map(s =>
                    s.id === id ? { ...s, learned: true } : s
                );
                await AsyncStorage.setItem("simple", JSON.stringify(updatedSigns));
                this.simple = updatedSigns;
            }
        } catch (error) {
            console.error("Error in signLearn:", error);
            throw error;
        }
    }
}

export const SignService = new Service();