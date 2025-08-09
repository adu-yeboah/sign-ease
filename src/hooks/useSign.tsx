import { useEffect, useState } from "react";
import { SignType } from "@/types/sign";
import { SignService } from "@/service/signServices";

export const useSign = () => {
    const [alphabet, setAlphabet] = useState<SignType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const markAsLearned = async (id: string) => {
        try {
            await SignService.signLearn(id);
            const updatedSigns = await SignService.loadSigns();
            setAlphabet(updatedSigns);
        } catch (err) {
            setError("Failed to mark sign as learned");
            console.error(err);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const signs = await SignService.loadSigns();
                if (isMounted) {
                    setAlphabet(signs);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load signs");
                }
                console.error(err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        alphabet,
        loading,
        error,
        markAsLearned,
    };
};