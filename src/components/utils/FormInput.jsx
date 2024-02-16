import { TextField, Typography } from '@mui/material';
import React from 'react';

const FormInput = ({
  id,
  label,
  value,
  type,
  onChange,
  error,
  onBlur,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <br></br>
      <TextField
        variant="outlined"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <Typography color="red">{error}</Typography>}
    </>
  );
};

export default FormInput;
