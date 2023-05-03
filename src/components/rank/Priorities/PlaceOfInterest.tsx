import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { AntSwitch } from "./AntSwitch";
import ModeDropdown from "./ModeDropdown";
import { Dispatch } from "react";
import {
  PlaceOfInterestAction,
  PlaceOfInterest,
  SearchParameterActions,
} from "./utils";

interface IProps {
  dispatch: Dispatch<PlaceOfInterestAction>;
  placeOfInterest: PlaceOfInterest;
}

const PlaceOfInterestCard = (props: IProps) => {
  const { dispatch, placeOfInterest } = props;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    attribute: "weight" | "searchTerm"
  ) => {
    console.log("pancake", event.target);
    dispatch({
      type: SearchParameterActions.Edit,
      payload: {
        position: 0,
        ...(attribute === "weight" && { weight: parseInt(event.target.value) }),
        ...(attribute === "searchTerm" && {
          searchTerm: event.target.value,
        }),
      },
    });
  };
  return (
    <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0.5rem" }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" paddingY={1}>
          <Box paddingX={1}>
            <Typography variant="h5" component="h4">
              Look for This
            </Typography>
          </Box>
          <Box paddingX={1}>
            <TextField
              label="Weight"
              type="number"
              variant="outlined"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                shrink: "true",
                step: 1,
              }}
              value={placeOfInterest.weight}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, "weight")
              }
            />
          </Box>
        </Box>

        <Box paddingY={1}>
          <TextField
            sx={{ width: "25rem" }}
            label="Search Term"
            variant="outlined"
            placeholder='e.g. "groceries", "airport"'
            value={placeOfInterest.searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event, "searchTerm")
            }
          />
        </Box>

        <Box display="flex" paddingY={1}>
          <TextField
            label="Distance"
            type="number"
            variant="outlined"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              shrink: "true",
              step: 0.1,
            }}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            paddingLeft="1rem"
          >
            <Typography>Miles</Typography>
            <AntSwitch inputProps={{ "aria-label": "ant design" }} />
            <Typography>Kilometers</Typography>
          </Stack>
        </Box>
        <Box paddingY={1}>
          <ModeDropdown />
        </Box>
      </Box>
    </Paper>
  );
};

export default PlaceOfInterestCard;
