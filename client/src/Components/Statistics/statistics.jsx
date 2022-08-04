import "./statistics.css";
import React, { useEffect, useMemo, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import BarChart from "./Charts/barChart";
import PieChart from "./Charts/pieChart";
import statisticsClient from "../../Services/statisticsClient";
import LineChart from "./Charts/lineChart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Statistics = () => {
    const [userData, setUserData] = useState([]);
    const [whichChart, setWhichChart] = useState();
    const [whichInfo, setWhichInfo] = useState();
    const [isShowOfficeIdRadioList, setIsShowOfficeIdRadioList] = useState(false);
    const [firstDateOfCompareDates, setFirstDateOfCompareDates] = useState(null);
    const [secondDateOfCompareDates, setSecondDateOfCompareDates] = useState(null);
    const [officeId, setOfficeId] = useState(null);
    const [showDates, setShowDates] = useState(false);

    const handleChangeStatisticsChoose = async (event) => {
        switch(event.target.value){
            case "Chairs information":
                setIsShowOfficeIdRadioList(true);
                setUserData([]);
                setWhichChart(null);
                setFirstDateOfCompareDates(null);
                setSecondDateOfCompareDates(null);
                setWhichInfo("Chairs information");
                setShowDates(false);
                break;
            case "Offices information":
              setWhichChart("BarChart");
              setFirstDateOfCompareDates(null);
              setSecondDateOfCompareDates(null);
              setIsShowOfficeIdRadioList(false);
              setShowDates(false);
              setOfficeId(null);
              setUserData(await statisticsClient.getOfficesStatistics());
                break;
            case "Compare dates":
              setWhichInfo("Compare dates");
              setIsShowOfficeIdRadioList(true);
              setUserData([]);
              setWhichChart(null);
        }
    }

    const handleChangeOfficeId = async(event) => {
        setOfficeId(event.target.value);
        if(whichInfo === "Chairs information"){
          setUserData(await statisticsClient.getChairsStatistics(event.target.value));
        }else {
          setShowDates(true);
        }
        setWhichChart("LineChart");
    }

    const chooseWhichChart = useMemo(() => {
        if(userData.length !== 0){
            switch(whichChart){
                case "BarChart":
                    return <BarChart chartData={userData}/>
                case "LineChart":
                    return <LineChart chartData={userData}/>
            }
        } else {
            return <div>No Data yet</div>;
        }
    }, [userData]);
return (
    <div>
    <div>
        <FormControl fullWidth>
  <InputLabel id="Statistics-select-label">Statistics</InputLabel>
  <Select
    labelId="Statistics-select-label"
    id="Statistics-select"
    defaultValue={""}
    label="Statistics"
    onChange={handleChangeStatisticsChoose}
  >
    <MenuItem value={"Chairs information"}>Chairs information</MenuItem>
    <MenuItem value={"Offices information"}>Offices information</MenuItem>
    <MenuItem value={"Compare dates"}>Compare dates</MenuItem>
  </Select>
</FormControl>
{isShowOfficeIdRadioList === true ? 
<div>
    <FormControl fullWidth spacing={2}>
  <InputLabel id="Office-id-select-label">Office id</InputLabel>
<Select
    labelId="office-id-select"
    id="office-id-select"
    defaultValue={""}
    label="Office id"
    onChange={handleChangeOfficeId}
  >
    <MenuItem value={"1"}>1</MenuItem>
    <MenuItem value={"2"}>2</MenuItem>
    <MenuItem value={"3"}>3</MenuItem>
  </Select>
  </FormControl>
  {showDates === true?
  <div className="booking-form-body">
    <form>
    <div className="form-date">
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    class="ui-datepicker"
    label="Date"
    inputFormat="dd/MM/yyyy"
    value={firstDateOfCompareDates}
    onChange={async (date) => {
      setFirstDateOfCompareDates(new Date(date));
      if(secondDateOfCompareDates !== null){
        setUserData(await statisticsClient.compareTwoDatesOfOffice(officeId, new Date(date), secondDateOfCompareDates));
      }
    }}
    renderInput={(params) => (
      <TextField size="small" {...params} />
    )}
  />
</LocalizationProvider>
</div>
<div className="form-date">
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    class="ui-datepicker"
    label="Date"
    inputFormat="dd/MM/yyyy"
    value={secondDateOfCompareDates}
    onChange={async (date) => {
      setSecondDateOfCompareDates(new Date(date));
      if(firstDateOfCompareDates !== null){
        setUserData(await statisticsClient.compareTwoDatesOfOffice(officeId, firstDateOfCompareDates, new Date(date)));
      }
      console.log("hey");
    }}
    renderInput={(params) => (
      <TextField size="small" {...params} />
    )}
  />
</LocalizationProvider>
</div>
</form>
</div>:<></>}
</div>
  :<></>}
{chooseWhichChart}
</div>
</div>
  );
};
export default Statistics;