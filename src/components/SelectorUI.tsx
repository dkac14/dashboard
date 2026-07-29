import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface SelectorProps {
  onOptionSelect: (option: string) => void;
}

export default function SelectorUI({
  onOptionSelect,
}: SelectorProps) {
  const [cityInput, setCityInput] =
    useState("");

  const handleChange = (
    event: SelectChangeEvent<string>
  ) => {
    const selectedValue =
      event.target.value;

    // Cambia el valor visual del Select.
    setCityInput(selectedValue);

    // Comunica el valor al componente App.
    onOptionSelect(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">
        Ciudad
      </InputLabel>

      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput}
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          <em>Seleccione una ciudad</em>
        </MenuItem>

        <MenuItem value="Guayaquil">
          Guayaquil
        </MenuItem>

        <MenuItem value="Quito">
          Quito
        </MenuItem>

        <MenuItem value="Manta">
          Manta
        </MenuItem>

        <MenuItem value="Cuenca">
          Cuenca
        </MenuItem>
      </Select>

      {cityInput && (
        <Typography
          variant="body2"
          sx={{ mt: 1 }}
        >
          Información del clima en{" "}
          <strong>{cityInput}</strong>
        </Typography>
      )}
    </FormControl>
  );
}