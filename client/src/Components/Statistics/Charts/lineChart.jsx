import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

const LineChart = ({chartData}) => {

return (
    <Line data={chartData}/>
  );
};
export default LineChart;