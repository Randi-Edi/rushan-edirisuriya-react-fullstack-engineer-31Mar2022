import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  size?: "small" | "medium";
  variant?: "filled" | "outlined" | "standard";
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ placeholder, size, variant, onChange }: SearchBarProps) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        variant={variant}
        size={size}
        fullWidth
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
