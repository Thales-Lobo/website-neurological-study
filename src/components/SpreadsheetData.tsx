import React, { useEffect, useState } from 'react';
import { loadSpreadsheetData } from '../services/googleSheets';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import data_labels from '../structures/data_labels.json';
const TABLE_HEADERS = data_labels.domains;


const styles = {
  headerCell: {
    variant: 'h5',
    backgroundColor: '#759CC9',
    color: '#ffffff',
    fontWeight: 'bold',
    borderBottom: '2px solid #000000'
  },
  cell: {
    // Add other styles here if necessary
  },
};

const SpreadsheetData: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadSpreadsheetData()
      .then((rows) => {
        setData(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading spreadsheet data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
      <Typography variant="h4" fontWeight='bold' gutterBottom>Dados do Paciente</Typography>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableCell key={index} align="center" style={styles.headerCell}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} style={rowIndex % 2 === 0 ? { backgroundColor: '#ffffff' } : { backgroundColor: '#f0f0f0' }}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} align="center" style={cellIndex === 0 ? { ...styles.cell, fontWeight: 'bold' } : styles.cell}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default SpreadsheetData;
