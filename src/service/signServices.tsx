import alphabetData from "@/data/alphabet";
import { SignType } from "@/types/sign";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Service {
    alphabet: SignType[] = alphabetData;

    constructor() {
        this.loadSigns();
    }

    public async loadSigns(): Promise<SignType[]> {
        try {
            const storedAlphabet = await AsyncStorage.getItem("alphabets");
            this.alphabet = JSON.parse(String(storedAlphabet)) || alphabetData;
            return this.alphabet
        } catch (error) {
            console.error("Error loading alphabet from storage:", error);
            return this.alphabet;
        }
    }

    // Save sign data
    async saveData(): Promise<void> {
        try {
            const alphabet = alphabetData.toString();
            await AsyncStorage.setItem("alphabets", alphabet);
        } catch (error) {
            console.error("Error saving alphabet data:", error);
            throw error;
        }
    }

    // mark sign as learned
    async signLearn(id: string): Promise<void> {
        try {
            if (this.alphabet === null) {
                await this.loadSigns();
            }
            const updateSign = this.alphabet.map(s => {
                if (s.id == id) {
                    return { ...s, learned: true }
                }
                return s
            })
            AsyncStorage.setItem("alphabets", JSON.stringify(updateSign))
            // return this.alphabet
        } catch (error) {
            console.error("Error in signLearn:", error);
            throw error;
        }
    }
}

export const SignService = new Service();