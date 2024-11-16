import React from 'react';
import { FieldProps } from 'formik';
import { TextField, TextFieldProps } from "@mui/material";

interface MyFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
}

export const MyField: React.FC<(FieldProps & TextFieldProps) | any> = ({
  field,
  label,
  placeholder,
  type,
  variant,
  color,
}: any) => {
  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      variant={variant}
      color={color}
      fullWidth
    />
  );
};

export const DateINput: React.FC<(FieldProps & TextFieldProps) | any> = ({
  props,
  field,
  type,
  defaultValue,
}: any) => {
  return (
    <TextField
      {...field}
      type={type}
      defaultValue={defaultValue}
      inputProps={{ min: "2022-04-01", max: "2028-01-01" }}
      required={true}
      {...props}
    />
  );
};

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const BasicSelect: React.FC<(FieldProps & TextFieldProps) | any> = ({
  props,
  field,
  label,
  defaultValue,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select {...field} {...props}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Abed"}>Abed</MenuItem>
          <MenuItem value={"Abbas"}>Abbas</MenuItem>
          <MenuItem value={"Katrine"}>Katrine</MenuItem>
          <MenuItem value={"Alaa"}>Alaa</MenuItem>
          <MenuItem value={"Pedram"}>Pedram</MenuItem>
          <MenuItem value={"Bassel"}>Bassel</MenuItem>
          <MenuItem value={"Safe"}>Safe</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Invoice"}>Invoice</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
