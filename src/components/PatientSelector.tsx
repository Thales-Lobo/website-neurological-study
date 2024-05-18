import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, SelectChangeEvent } from '@mui/material';

interface PatientSelectorProps {
  patients: string[];
  selectedPatient: string | null;
  onSelect: (patient: string) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ patients, selectedPatient, onSelect }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSelect(event.target.value as string);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Selecionar Paciente</Typography>
      <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
        <InputLabel id="patient-select-label">Paciente</InputLabel>
        <Select
          labelId="patient-select-label"
          value={selectedPatient || ''}
          onChange={handleChange}
          label="Paciente"
        >
          <MenuItem value="">Selecionar Paciente</MenuItem> {"Selecionar Paciente"}
          {patients.map((patient) => (
            <MenuItem key={patient} value={patient}>
              {patient}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PatientSelector;
