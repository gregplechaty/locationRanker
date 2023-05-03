import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch } from "react";
import { PlaceOfInterestAction, SearchParameterActions } from "./utils";

const options = [
  { value: "walk", description: "Walking" },
  { value: "cycle", description: "Cycling" },
  { value: "drive", description: "Driving" },
  { value: "transport", description: "Public Transit" },
];

interface IProps {
  transportMode: string;
  dispatch: Dispatch<PlaceOfInterestAction>;
}

export default function SelectAutoWidth(props: IProps) {
  const { transportMode, dispatch } = props;

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: SearchParameterActions.Edit,
      payload: {
        position: 0,
        transportMode: event.target.value,
      },
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Travel By:
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={transportMode}
          onChange={handleChange}
          autoWidth
          label="Mode of Transportation"
        >
          {options.map(({ value, description }) => {
            return (
              <MenuItem key={value} value={value}>
                {description}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
