import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TransportationMethod = {
  WALK: "Walk",
  DRIVE: "Drive",
  PUBLICTRANSPORT: "Public Transport",
  CYCLING: "Cycling",
};

export default function SelectAutoWidth() {
  const [transportMode, setTransportMode] = React.useState(
    TransportationMethod.WALK
  );

  const handleChange = (event: SelectChangeEvent) => {
    setTransportMode(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={transportMode}
          onChange={handleChange}
          autoWidth
          label="Mode of Transportation"
        >
          {Object.values(TransportationMethod).map((mode) => {
            return (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
