// Dashboard.tsx
// React Hooks
import React, { useState, useEffect } from 'react';
// Material Components
import { Box, Grid, Paper } from '@mui/material';
// Local Components
import PatientSelector from './PatientSelector';
import DomainSelector from './DomainSelector';
import SpreadsheetData from './SpreadsheetData';
import ChartComponent from './ChartComponent';
import AddButton from './AddButton';
// Local Structures
import data_labels from '../structures/data_labels.json';
// General Imports
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const PATIENTS_OPTIONS = data_labels.patients;
const DOMAINS_OPTIONS = data_labels.domains;

const PATIENTS_OPTIONS_SORTED = [...PATIENTS_OPTIONS].sort((a, b) => a.localeCompare(b));
const COLOR_PALETTE = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'
];

const domainColors = DOMAINS_OPTIONS.reduce((acc, domain, index) => {
  acc[domain] = COLOR_PALETTE[index % COLOR_PALETTE.length];
  return acc;
}, {} as { [key: string]: string });

const Dashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedDomain, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPatient(PATIENTS_OPTIONS_SORTED[0]);
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

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: selectedDomain.map((dataOption) => ({
      label: dataOption,
      //TODO: Mock Data
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
      borderColor: domainColors[dataOption],
      backgroundColor: domainColors[dataOption],
      fill: false,
    })),
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2, position: 'relative'}}>
            <PatientSelector patients={PATIENTS_OPTIONS_SORTED} selectedPatient={selectedPatient} onSelect={handlePatientSelect} />
            <DomainSelector 
              domainOptions={DOMAINS_OPTIONS} 
              selectedDomain={selectedDomain} 
              onSelect={handleDataToggle}
              domainColors={domainColors}
            />
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <AddButton />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <ChartComponent data={chartData} selectedDomain={selectedDomain} />
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
