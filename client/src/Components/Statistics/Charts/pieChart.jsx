import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Scatter, Chart } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import './charts.css';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({chartData}) => {

return (
        <Container>
      <Grid container>
        <Grid item xs={12} justifyContent={"center"}>
    <div style={{width:300, margin:20}}>
        <Pie data={chartData}/>
    </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PieChart;