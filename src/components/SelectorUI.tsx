import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {
  type SelectChangeEvent,
} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import type { CityName } from "../hooks/useFetchData";

interface SelectorUIProps {
  selectedCity: CityName;
  onOptionSelect: (city: CityName) => void;
}

export default function SelectorUI({
  selectedCity,
  onOptionSelect,
}: SelectorUIProps) {
  const handleChange = (
    event: SelectChangeEvent<CityName>
  ) => {
    onOptionSelect(event.target.value as CityName);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">
        Ciudad
      </InputLabel>

      <Select<CityName>
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={selectedCity}
        onChange={handleChange}
      >
        <MenuItem value="guayaquil">
          Guayaquil
        </MenuItem>

        <MenuItem value="quito">
          Quito
        </MenuItem>

        <MenuItem value="manta">
          Manta
        </MenuItem>

        <MenuItem value="cuenca">
          Cuenca
        </MenuItem>
      </Select>
    </FormControl>
  );
}