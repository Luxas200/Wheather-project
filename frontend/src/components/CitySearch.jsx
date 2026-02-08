import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CitySearch({ cities, onSelect }) {
  return (
    <Autocomplete
      options={cities}
      getOptionLabel={(opt) => opt.name}
      onChange={(e, value) => value && onSelect(value)}
      renderInput={(params) => <TextField {...params} label="Search city" variant="outlined" />}
      sx={{ width: 300 }}
    />
  );
}