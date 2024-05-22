import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

interface ChartComponentProps {
    data: any;
    selectedDomain: string[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, selectedDomain }) => {
    const options = {
        scales: {
            x: {
            beginAtZero: true,
            },
            y: {
            beginAtZero: true,
            },
        },
    };
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight='bold' gutterBottom>Evolução</Typography>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default ChartComponent;
