import React from "react";
import "./foodOrder.css";
import FoodFlipCard from "./../../Components/FoodFlipCard/FoodFlipCard";
import mcdonalds from "./mcdonalds.png";
import tacoBell from "./tacoBell.png";
import pandaExpress from "./panda.png";

const cards = [
  {
    id: "1",
    variant: "hover",
    front: "Hover",
    back: "Back",
    img: mcdonalds,
  },
  {
    id: "2",
    variant: "hover",
    front: "Hover",
    back: "Back",
    img: pandaExpress,
  },
  {
    id: "3",
    variant: "hover",
    front: "Hover",
    back: "Back",
    img: tacoBell,
  },
];

const FoodOrder = () => {
  return (
    <div className="food-order-container">
      <div className="food-order-glass">
        {cards.map((card) => (
          <FoodFlipCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FoodOrder;
