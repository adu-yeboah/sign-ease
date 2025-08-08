import { useEffect, useState, useCallback } from "react";
import { SignType } from "@/types/sign";
import { SignService } from "@/service/signServices";

export const useSign = () => {
    const [alphabet, setAlphabet] = useState<SignType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const markAsLearned = useCallback(async (id: string) => {
        try {
            await SignService.signLearn(id);
            const updatedSigns = await SignService.loadSigns();
            setAlphabet(updatedSigns);
        } catch (err) {
            setError("Failed to mark sign as learned");
            console.error(err);
        }
    }, []);

    // Load signs on initial render
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const signs = await SignService.loadSigns();
                setAlphabet(signs);
            } catch (err) {
                setError("Failed to load signs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const saveSigns = async () => {
        try {
            await SignService.saveData();
        } catch (err) {
            setError("Failed to save signs");
            console.error(err);
        }
    };

    return {
        alphabet,
        loading,
        error,
        markAsLearned,
        saveSigns,
    };
};