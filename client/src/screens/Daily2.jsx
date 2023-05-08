
import DatePicker from "react-datepicker";
import Header from "./global/Header"
import { ResponsiveLine } from "@nivo/line";
import React, { useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetTicketCountsByDayQuery } from "../state/api";
import "react-datepicker/dist/react-datepicker.css";

import {Line} from "react-chartjs-2";
export function Daily() {
  
    const { data: ticketCounts = [], isFetching, isError } = useGetTicketCountsByDayQuery();
    const theme = useTheme();
  //const chart data
    const chartData = {
        labels: ticketCounts.map((ticketCount) => new Date(ticketCount.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Tickets Sold',
            data: ticketCounts.map((ticketCount) => ticketCount.count),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

//exceptions
if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching ticket counts by day</div>;
  }
    
     
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="DAILY SALES" subtitle="Chart of daily sales" />
        <Box height="75vh">
        <Line data={chartData} />
        </Box>
      </Box>
    );
  };