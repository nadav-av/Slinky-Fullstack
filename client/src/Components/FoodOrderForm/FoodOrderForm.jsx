import React, { useState } from "react";
import "./foodOrderForm.css";
import userClient from "../../Services/userClient";
import foodOrderClient from "../../Services/foodOrderClient";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { SERVER_ERROR, INVALID_TOKEN } from "../../Services/Consts";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const FoodOrderForm = ({
  resturant,
  namesAndOrders,
  setNamesAndOrders,
  setIsModalShown,
}) => {
  let navigate = useNavigate();
  const [foodOrder, setFoodOrder] = useState();
  const [orderOffice, setOrderOffice] = useState();

  const handleOfficeChange = (e) => {
    setOrderOffice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myUser = await userClient.getUser();
    const newFoodOrder = {
      firstName: myUser.firstName,
      lastName: myUser.lastName,
      office: orderOffice,
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Office</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderOffice}
            label="Age"
            onChange={handleOfficeChange}
          >
            <MenuItem value={"Rubinshtein Twin Towers"}>
              Rubinshtein Twin Towers
            </MenuItem>
            <MenuItem value={"Azrieli Square Tower"}>
              Azrieli Square Tower
            </MenuItem>
          </Select>
        </FormControl>
        <span></span>
        <input className="food-order-submit" type="submit" />
      </form>
    </div>
  );
};

export default FoodOrderForm;
