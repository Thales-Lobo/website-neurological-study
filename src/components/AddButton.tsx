// AddButton.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import data_labels from '../structures/data_labels.json';

const AddButton: React.FC = () => {
  const formsLink = data_labels.forms_link;

  return (
    <Tooltip title="Adicionar novo paciente">
      <IconButton 
        href={formsLink}
        target="_blank"
        sx={{
          backgroundColor: '#92B0D6',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#5E84A3',
          },
          '& .MuiSvgIcon-root': {
            color: '#000000',
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
