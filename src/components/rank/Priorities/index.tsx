import { Dispatch, SetStateAction, useReducer, useState } from "react";
import isArray from "lodash/isArray";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { findPlaces } from "utils/search/googlePlacesSearch";
import {
  createNewPlaceOfInterest,
  reducer,
  PlaceOfInterest,
  SearchParameterActions,
} from "./utils";
import PlaceOfInterestCard from "./PlaceOfInterest";
import { RankResult } from "pages/rank";

export const MAX_NUMBER_PLACES = 5;

interface IProps {
  setRankingResult: Dispatch<SetStateAction<RankResult | null>>;
}

const Priorities = (props: IProps) => {
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [placesOfInterest, dispatchplacesOfInterest] = useReducer(reducer, [
    createNewPlaceOfInterest(),
  ]);
  const [error, setError] = useState<string | null>("");
  const addPlaceOfInterest = () => {
    if (
      isArray(placesOfInterest) &&
      placesOfInterest.length < MAX_NUMBER_PLACES
    )
      dispatchplacesOfInterest({
        type: SearchParameterActions.Create,
        payload: {
          position: placesOfInterest.length,
        },
      });
  };
  const executeSearch = async () => {
    const result = await findPlaces(placesOfInterest, homeAddress);
    console.log("result:", result);
    if (result?.status === 200 && result?.data?.score) {
      props.setRankingResult(result);
      setError("");
    } else {
      props.setRankingResult(result);
      result?.message
        ? setError(result.message)
        : setError("Score ranking failed. Please review inputs and try again");
    }
  };
  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={2}>
        <Box padding={1}>
          <Typography variant="h4" component="h3">
            Your Priorities
          </Typography>
          {!!error && <Alert severity="warning">{error}</Alert>}
          <Box paddingY={2}>
            <Button variant="contained" onClick={executeSearch}>
              Query Your Priorities
            </Button>
          </Box>
          <TextField
            sx={{ width: "90%" }}
            label="Home Address"
            variant="outlined"
            placeholder="e.g. 875 North Michigan Avenue, Chicago, IL 60611"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
          />
          {placesOfInterest.map((place, i) => (
            <PlaceOfInterestCard
              key={place.id}
              dispatch={dispatchplacesOfInterest}
              placeOfInterest={place}
              position={i}
            />
          ))}
          <Tooltip title="Add Place of Interest (max: 5)">
            <Fab
              color={placesOfInterest.length > 4 ? "error" : "primary"}
              aria-label="add"
              disabled={!!(placesOfInterest.length > 4)}
              onClick={addPlaceOfInterest}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Priorities;
