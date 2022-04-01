import * as React from "react";
import TextField from "@mui/material/TextField";

interface TimePickerProps {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimePicker({ label, onChange }: TimePickerProps) {
  return (
    <>
      <div className="label">{label}</div>
      <TextField
        size="small"
        id="time"
        type="time"
        defaultValue="07:30"
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
        sx={{ width: 150 }}
      />
    </>
  );
}
