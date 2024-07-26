export type Card = {
    id: number;
    image: string;
    matched: boolean;
};

export const shuffleArray = (array: Card[]): Card[] => {
    return array.sort(() => Math.random() - 0.5);
};

export const generateCards = (): Card[] => {
    const images = ["/images/edison.jpg", "/images/einstein.jpg"];

    const cards = images.reduce((acc: Card[], image, index) => {
        acc.push({ id: index * 2, image, matched: false });
        acc.push({ id: index * 2 + 1, image, matched: false });
        return acc;
    }, []);

    return shuffleArray(cards);
};
