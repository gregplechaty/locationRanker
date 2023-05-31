import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { UnitsSwitch } from "./UnitsSwitch";
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
  position: number;
}

const PlaceOfInterestCard = (props: IProps) => {
  const { dispatch, placeOfInterest, position } = props;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    attribute: "searchTerm" | "transportMethod" | "weight" | "distance"
  ) => {
    const value =
      attribute === "weight" || attribute === "distance"
        ? parseFloat(event.target.value) ?? 0
        : event.target.value;
    dispatch({
      type: SearchParameterActions.Edit,
      payload: {
        position,
        [attribute]: value,
      },
    });
  };
  const deleteCard = () => {
    dispatch({
      type: SearchParameterActions.Delete,
      payload: { position: props.position },
    });
  };
  const handleSwitch = (inMiles: boolean) => {
    dispatch({
      type: SearchParameterActions.Edit,
      payload: {
        position,
        inMiles,
      },
    });
  };
  return (
    <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0.5rem" }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" paddingY={1}>
          <Box paddingX={1}>
            <Typography variant="h5" component="h4">
              Place of Interest
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
          <Tooltip title="Delete Place of Interest">
            <DeleteForeverIcon
              fontSize="large"
              onClick={deleteCard}
              sx={{ color: "#c61c1c", cursor: "pointer" }}
            />
          </Tooltip>
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
            value={placeOfInterest.distance}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event, "distance")
            }
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            paddingLeft="1rem"
          >
            <Typography>Miles</Typography>
            <UnitsSwitch
              checked={!placeOfInterest.inMiles}
              onChange={() => handleSwitch(!placeOfInterest.inMiles)}
              name="switchValue"
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Kilometers</Typography>
          </Stack>
        </Box>
        <Box paddingY={1}>
          <ModeDropdown
            transportMode={placeOfInterest.transportMode}
            position={position}
            dispatch={dispatch}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default PlaceOfInterestCard;
