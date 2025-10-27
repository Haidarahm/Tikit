"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  image?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  onCardChange,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  onCardChange?: (frontCard: Card) => void;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const [frontCardId, setFrontCardId] = useState<number>(items[0]?.id || 0);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  // Call onCardChange when cards change and update front card ID
  useEffect(() => {
    if (cards.length > 0) {
      setFrontCardId(cards[0].id); // cards[0] is always the front card
      if (onCardChange) {
        onCardChange(cards[0]);
      }
    }
  }, [cards, onCardChange]);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 8000); // Increased from 5000ms to 8000ms (8 seconds)
  };

  return (
    <div className="relative h-[284px] w-[800px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute  h-[280px] w-full dark:bg-black overflow-hidden rounded-[20px]  shadow-xl   shadow-black/[0.1] dark:shadow-white/[0.05] flex"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            {/* Image Section - Left */}
            <div className="w-[284px] h-full flex-shrink-0">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {card.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>

            {/* Text Section - Right */}
            <div
              className={`flex-1  text-white px-[60px] bg-[#e9e7e524]  py-[40px] flex flex-col justify-between`}
            >
              {card.id !== frontCardId ? (
                <></>
              ) : (
                <>
                  <div className="font-normal  ">{card.content}</div>
                  <div className="">
                    <p className="text- font-medium dark:text-white text-lg">
                      {card.name}
                    </p>
                    <p className="">{card.designation}</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
