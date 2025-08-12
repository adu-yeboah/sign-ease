export type SignType = {
    id: string;
    name: string;
    images: string[];
    description: string;
    category: 'alphabet' | 'simple' | 'advanced';
    learned?: boolean;
    imageUrl?: any;
}