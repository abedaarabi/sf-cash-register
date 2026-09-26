import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const fieldError = (form: any, name: string) =>
  form?.touched?.[name] && form?.errors?.[name] ? form.errors[name] : "";

export const MyField: React.FC<any> = ({
  field,
  form,
  label,
  placeholder,
  type,
  variant = "outlined",
  color,
  multiline,
  rows,
  required,
  startIcon,
  size = "medium",
}) => {
  const error = fieldError(form, field?.name);

  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      variant={variant}
      color={color}
      multiline={multiline}
      rows={rows}
      required={required}
      size={size}
      error={Boolean(error)}
      helperText={error || undefined}
      fullWidth
      InputProps={
        startIcon
          ? {
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export const DateINput: React.FC<any> = ({
  props,
  field,
  type,
  label,
  defaultValue,
}) => {
  return (
    <TextField
      {...field}
      type={type}
      label={label}
      defaultValue={defaultValue}
      inputProps={{ min: "2022-04-01", max: "2028-01-01" }}
      InputLabelProps={{ shrink: true }}
      required={true}
      fullWidth
      {...props}
    />
  );
};

const reasonOptions = [
  "Abed",
  "Abbas",
  "Katrine",
  "Alaa",
  "Pedram",
  "Bassel",
  "Safe",
  "Music",
  "Invoice",
];

export const BasicSelect: React.FC<any> = ({ props, field, label }) => {
  const labelId = `${field?.name || "basic"}-select-label`;

  return (
    <Box sx={{ minWidth: 120, width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select labelId={labelId} label={label} {...field} {...props}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {reasonOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
