import "./foodOrderList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const FoodOrderList = (props) => {
  return (
    <div className="food-order-list-container">
      <List>
        <ListItem>Nadav Avraham</ListItem>
        <ListItem>Dana Cohen</ListItem>
      </List>
    </div>
  );
};

export default FoodOrderList;
