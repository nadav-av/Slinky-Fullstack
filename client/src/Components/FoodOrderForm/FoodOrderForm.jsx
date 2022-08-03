import React, { useState } from "react";
import "./foodOrderForm.css";

const FoodOrderForm = ({ submitOrder }) => {
  const [foodOrder, setFoodOrder] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("foodOrder", foodOrder);
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
