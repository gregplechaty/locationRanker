import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch } from "react";
import { PlaceOfInterestAction, SearchParameterActions } from "./utils";

const options = [
  { value: "WALKING", description: "Walking" },
  { value: "BICYCLING", description: "Cycling" },
  { value: "DRIVING", description: "Driving" },
  { value: "TRANSIT", description: "Public Transit" },
];

interface IProps {
  dispatch: Dispatch<PlaceOfInterestAction>;
  position: number;
  transportMode: string;
}

export default function SelectAutoWidth(props: IProps) {
  const { dispatch, position, transportMode } = props;

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: SearchParameterActions.Edit,
      payload: {
        position,
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
