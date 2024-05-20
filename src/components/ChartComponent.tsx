import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const ChartComponent: React.FC<{ data: any, selectedDomain: string[] }> = ({ data, selectedDomain }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight='bold' gutterBottom>Evolução</Typography>
      <Line data={data} />
    </Paper>
  );
};

export default ChartComponent;
