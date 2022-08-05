import "./statistics.css";
import React, { useEffect, useMemo, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BarChart from "./Charts/barChart";
import statisticsClient from "../../Services/statisticsClient";
import LineChart from "./Charts/lineChart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import GenericModal from "../GenericModal/genericModal";

const Statistics = () => {
  const [userData, setUserData] = useState([]);
  const [whichChart, setWhichChart] = useState();
  const [whichInfo, setWhichInfo] = useState();
  const [isShowOfficeIdRadioList, setIsShowOfficeIdRadioList] = useState(false);
  const [firstDateOfCompareDates, setFirstDateOfCompareDates] = useState(null);
  const [secondDateOfCompareDates, setSecondDateOfCompareDates] =
    useState(null);
  const [officeId, setOfficeId] = useState(null);
  const [showDates, setShowDates] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeStatisticsChoose = async (event) => {
    switch (event.target.value) {
      case "Chairs information":
        setIsShowOfficeIdRadioList(true);
        setUserData([]);
        setWhichChart(null);
        setFirstDateOfCompareDates(null);
        setSecondDateOfCompareDates(null);
        setWhichInfo("Chairs information");
        setShowDates(false);
        setOfficeId("");
        break;
      case "Offices information":
        setWhichChart("BarChart");
        setFirstDateOfCompareDates(null);
        setSecondDateOfCompareDates(null);
        setIsShowOfficeIdRadioList(false);
        setShowDates(false);
        setOfficeId("");
        setUserData(await statisticsClient.getOfficesStatistics());
        break;
      case "Compare dates":
        setWhichInfo("Compare dates");
        setIsShowOfficeIdRadioList(true);
        setUserData([]);
        setWhichChart(null);
        if (officeId !== null) {
          setShowDates(true);
        }
        setOfficeId("");
    }
  };

  const handleChangeOfficeId = async (event) => {
    setOfficeId(event.target.value);
    if (whichInfo === "Chairs information") {
      setUserData(
        await statisticsClient.getChairsStatistics(event.target.value)
      );
    } else {
      if(firstDateOfCompareDates !== null && secondDateOfCompareDates !== null){
        setUserData(
          await statisticsClient.compareTwoDatesOfOffice(
            event.target.value,
            firstDateOfCompareDates,
            secondDateOfCompareDates
          )
        );
      }
      setShowDates(true);
    }
    setWhichChart("LineChart");
  };

  const chooseWhichChart = useMemo(() => {
    if (userData.length !== 0) {
      switch (whichChart) {
        case "BarChart":
          return (
            <div className="chart-container-try">
          <BarChart chartData={userData} />
          </div>);
        case "LineChart":
          return (
            <div className="chart-container-try">
          <LineChart chartData={userData} />
          </div>);
      }
    } else {
      return <div>No Data yet</div>;
    }
  }, [userData]);
  return (
    <div className="chart-container">
      <div className="form-control">
        <FormControl fullWidth margin="dense">
          <InputLabel id="Statistics-select-label" margin="dense">Statistics</InputLabel>
          <Select
            labelId="Statistics-select-label"
            id="Statistics-select"
            defaultValue={""}
            label="Statistics"
            onChange={handleChangeStatisticsChoose}
          >
            <MenuItem value={"Chairs information"}>Chairs information</MenuItem>
            <MenuItem value={"Offices information"}>
              Offices information
            </MenuItem>
            <MenuItem value={"Compare dates"}>Compare dates</MenuItem>
          </Select>
        </FormControl>
        {isShowOfficeIdRadioList === true ? (
          <div>
            <FormControl fullWidth spacing={2}>
              <InputLabel id="Office-id-select-label">Offices</InputLabel>
              <Select
                labelId="office-id-select"
                id="office-id-select"
                value={officeId}
                label="Office"
                onChange={handleChangeOfficeId}
              >
                <MenuItem value={"1"}>Rubinshtein Twin Towers</MenuItem>
                <MenuItem value={"2"}>Azrieli Square Tower</MenuItem>
              </Select>
            </FormControl>
            {showDates === true ? (
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
                          if (secondDateOfCompareDates !== null) {
                            setUserData(
                              await statisticsClient.compareTwoDatesOfOffice(
                                officeId,
                                new Date(date),
                                secondDateOfCompareDates
                              )
                            );
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
                          if (firstDateOfCompareDates !== null) {
                            setUserData(
                              await statisticsClient.compareTwoDatesOfOffice(
                                officeId,
                                firstDateOfCompareDates,
                                new Date(date)
                              )
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="chart-container-try">{chooseWhichChart}</div>
      </div>
    </div>
  );
};
export default Statistics;
