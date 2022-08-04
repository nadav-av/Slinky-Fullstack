import React from "react";
import "./foodOrder.css";
import FoodFlipCard from "./../../Components/FoodFlipCard/FoodFlipCard";
import mcdonalds from "./mcdonalds.png";
import tacoBell from "./tacoBell.png";
import pandaExpress from "./panda.png";
import TabContext from "@reach/tab-context";
import { TabList, TabPanel, Tab } from "@reach/tabs";
import Box from "@reach/box";

const cards = [
  {
    id: "1",
    resturant: "mcdonalds",
    variant: "hover",
    front: "Hover",
    back: "Back",
    img: mcdonalds,
  },
  {
    id: "2",
    resturant: "tacobell",
    variant: "hover",
    front: "Hover",
    back: "Back",
    img: pandaExpress,
  },
  {
    id: "3",
    resturant: "pandaexpress",
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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
      </div>
    </div>
  );
};

// return (
//   <div className="food-order-container">
//     <div className="food-order-glass">
//       {cards.map((card) => (
//         <FoodFlipCard key={card.id} card={card} />
//       ))}
//     </div>
//   </div>
// );

export default FoodOrder;
