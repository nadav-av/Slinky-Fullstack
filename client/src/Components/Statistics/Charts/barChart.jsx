import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

const BarChart = ({chartData}) => {

return (
    <Bar data={chartData}/>
  );
};
export default BarChart;