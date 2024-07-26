import { useState, useEffect } from "react";
import { Card, generateCards } from "./utils";
import "./Game.css";

const Game = () => {
    const [cards, setCards] = useState<Card[]>(generateCards());
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2) return;
        if (flippedCards.includes(index)) return;

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstIndex, secondIndex] = newFlippedCards;
            if (cards[firstIndex].image === cards[secondIndex].image) {
                const newCards = cards.map((card) =>
                    card.image === cards[firstIndex].image
                        ? { ...card, matched: true }
                        : card
                );
                setCards(newCards);
                setMatchedPairs(matchedPairs + 1);
            }

            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    const handleRestart = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setMatchedPairs(0);
    };

    useEffect(() => {
        handleRestart();
    }, []);

    return (
        <div className="memory-game">
            <h1>Memory Game</h1>
            <div className="grid-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${
                            flippedCards.includes(index) || card.matched
                                ? "flipped"
                                : ""
                        }`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front"></div>
                            <div className="card-back">
                                <img src={card.image} alt="memory card" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleRestart}>Restart Game</button>
        </div>
    );
};

export default Game;
