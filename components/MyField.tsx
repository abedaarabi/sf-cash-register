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
}) => {
  return (
    <TextField
      {...field}
      color={color}
      variant={variant}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      required={required}
      style={{ width, marginBottom }}
      defaultValue={defaultValue}
      multiline={multiline}
      rows={rows}
    />
  );
};
