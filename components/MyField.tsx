import { TextField, TextFieldProps } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

export const MyField: React.FC<(FieldProps & TextFieldProps) | any> = ({
  placeholder,
  label,
  field,
  variant,
  color,
  type,
  size,
  value,
  width,
  marginBottom,
  defaultValue,
  multiline,
  rows,
  required,
  props,
}) => {
  return (
    <TextField
      {...field}
      color={color}
      variant={variant}
      label={label}
      placeholder={placeholder}
      type={type}
      // value={value}
      required={required}
      style={{ width, marginBottom }}
      defaultValue={defaultValue}
      multiline={multiline}
      rows={rows}
      {...props}
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
  // const [age, setAge] = React.useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select {...field} {...props}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Safe"}>Safe</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Invoice"}>Invoice</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
