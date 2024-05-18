import React, { useEffect, useState } from 'react';
import { loadSpreadsheetData } from '../services/googleSheets';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const SpreadsheetData: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load the spreadsheet data when the component mounts
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
      <Typography variant="h4" gutterBottom>Dados do Paciente</Typography>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {data[0] && data[0].map((header, index) => (
                <TableCell key={index} align="center">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} align="center">{cell}</TableCell>
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
