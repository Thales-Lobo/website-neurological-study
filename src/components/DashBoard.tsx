import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import PatientSelector from './PatientSelector';
import DomainSelector from './DomainSelector';
import SpreadsheetData from './SpreadsheetData';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import data_labels from '../structures/data_labels.json';
Chart.register(CategoryScale);

const PATIENTS_OPTIONS = data_labels.patients;
const DOMAINS_OPTIONS = data_labels.domains;

// Define a color palette
const COLOR_PALETTE = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'
];

// Create a color map for each domain
const domainColors = DOMAINS_OPTIONS.reduce((acc, domain, index) => {
  acc[domain] = COLOR_PALETTE[index % COLOR_PALETTE.length];
  return acc;
}, {} as { [key: string]: string });

const Dashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedDomain, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPatient(PATIENTS_OPTIONS[0]);
  }, []);

  const handlePatientSelect = (patient: string) => {
    setSelectedPatient(patient);
  };

  const handleDataToggle = (data_labels: string) => {
    if (selectedDomain.includes(data_labels)) {
      setSelectedData(selectedDomain.filter(item => item !== data_labels));
    } else {
      setSelectedData([...selectedDomain, data_labels]);
    }
  };

  // Dados mocados para o gráfico
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: selectedDomain.map((dataOption) => ({
      label: dataOption,
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)), // Mock data
      borderColor: domainColors[dataOption],
      backgroundColor: domainColors[dataOption],
      fill: false,
    })),
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <PatientSelector patients={PATIENTS_OPTIONS} selectedPatient={selectedPatient} onSelect={handlePatientSelect} />
            <DomainSelector 
              domainOptions={DOMAINS_OPTIONS} 
              selectedDomain={selectedDomain} 
              onSelect={handleDataToggle}
              domainColors={domainColors} // Pass domain colors to DomainSelector
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Evolução</Typography>
            <Line data={chartData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <SpreadsheetData />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
