import "./statistics.css";
import React, { useEffect, useMemo, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import BarChart from "./Charts/barChart";
import PieChart from "./Charts/pieChart";

const Statistics = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {

    }, [userData]);

    const handleChange = async (event) => {
        const x = 'bookingPlace'
        const someTry = await fetch("http://localhost:3042/statistics/1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const res = await someTry.json();
        const data = {
            labels: res.map((data) => data[x]),
    datasets: [
      {
        label: "Users Gained",
        data: res.map((data) => data.booked),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        // borderWidth: 2,
      },
    ],
}
if(event.target.value === 20){
    console.log("you know the deal");
    setUserData([]);
    return;
}
setUserData(data);
    }

    const someTry = useMemo(() => {
        if(userData.length !== 0){
            return <PieChart chartData={userData}/>
        } else {
            return <div>Gotcha</div>;
        }
    }, [userData]);
return (
    <div>
    <div>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Statistics</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={""}
    label="Statistics"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
{someTry}
</div>
</div>
  );
};
export default Statistics;