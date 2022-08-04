import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const BarChart = ({chartData}) => {

return (
    <Container>
    <Grid container>
      <Grid item xs={12} justifyContent={"center"}>
  <div style={{width:300, margin:20}}>
      <Bar data={chartData}/>
  </div>
      </Grid>
    </Grid>
  </Container>
  );
};
export default BarChart;