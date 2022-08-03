import { useState } from "react";
import cn from "classnames";
import "./foodFlipCard.scss";
import FoodOrderList from "./../FoodOrderList/FoodOrderList";
import GenericModal from "../GenericModal/genericModal";
import FoodOrderForm from "./../FoodOrderForm/FoodOrderForm";

function FoodFlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [namesAndOrders, setNamesAndOrders] = useState([]);

  function handleClick() {
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
  }

  function handleFocus() {
    if (card.variant === "focus") {
      setShowBack(true);
    }
  }

  function handleBlur() {
    if (card.variant === "focus") {
      setShowBack(false);
    }
  }

  return (
    <div>
      {isModalShown === true ? (
        <GenericModal
          open={isModalShown}
          onClose={() => {
            setIsModalShown(false);
          }}
          content={<FoodOrderForm submitOrder = {setNamesAndOrders} />}
        />
      ) : (
        <div
          tabIndex={card.id}
          className={cn("flip-card-outer", {
            "focus-trigger": card.variant === "focus",
          })}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div
            className={cn("flip-card-inner", {
              showBack,
              "hover-trigger": card.variant === "hover",
            })}
          >
            <div className="card front">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img src={card.img} alt="" />
              </div>
            </div>
            <div className="card back">
              <div className="card-body d-flex justify-content-center align-items-center">
                <div className="foodList"></div>
                <FoodOrderList></FoodOrderList>
                <button
                  className="add-order-btn"
                  onClick={() => setIsModalShown(true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodFlipCard;
