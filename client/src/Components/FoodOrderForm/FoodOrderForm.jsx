import React, { useState } from "react";
import "./foodOrderForm.css";
import userClient from "../../Services/userClient";
import foodOrderClient from "../../Services/foodOrderClient";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { SERVER_ERROR, INVALID_TOKEN } from "../../Services/Consts";

const FoodOrderForm = ({
  resturant,
  namesAndOrders,
  setNamesAndOrders,
  setIsModalShown,
}) => {
  let navigate = useNavigate();
  const [foodOrder, setFoodOrder] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myUser = await userClient.getUser();
    const newFoodOrder = {
      firstName: myUser.firstName,
      lastName: myUser.lastName,
      order: foodOrder,
      resturant: resturant,
    };
    const res = await foodOrderClient.addOrder(newFoodOrder);
    if (res === INVALID_TOKEN) {
      navigate("/login");
    }
    if (res === SERVER_ERROR) {
      alert("Server Error");
    } else {
      setNamesAndOrders([...namesAndOrders, newFoodOrder]);
      setIsModalShown(false);
      setTimeout(() => {
        confetti();
      }, 200);
    }
  };

  return (
    <div className="center food-order-center">
      <h1 className="food-order-header">What do you want to eat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="food-order-text-area"
          type="text"
          onChange={(e) => setFoodOrder(e.target.value)}
          required
        />
        <span></span>
        <input className="food-order-submit" type="submit" />
      </form>
    </div>
  );
};

export default FoodOrderForm;
