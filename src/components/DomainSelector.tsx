import React from 'react';
import { Checkbox, FormControlLabel, Typography, FormGroup } from '@mui/material';

interface DomainSelectorProps {
  domainOptions: string[];
  selectedDomain: string[];
  onSelect: (domain: string) => void;
  domainColors: { [key: string]: string };
}

const DomainSelector: React.FC<DomainSelectorProps> = ({ domainOptions, selectedDomain, onSelect, domainColors }) => {
  return (
    <div>
      <Typography variant="h5" fontWeight='bold' gutterBottom>Domínios</Typography>
      <FormGroup>
        {domainOptions.map(domain => (
          <FormControlLabel
            key={domain}
            control={<Checkbox 
                        checked={selectedDomain.includes(domain)} 
                        onChange={() => onSelect(domain)} 
                        sx={{ color: domainColors[domain] }} 
                     />}
            label={domain}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default DomainSelector;
