import { Dispatch, SetStateAction, useReducer, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { findPlaces } from "utils/search/googlePlacesSearch";
import { reducer, PlaceOfInterest } from "./utils";
import PlaceOfInterestCard from "./PlaceOfInterest";
import { RankResult } from "pages/rank";

const initialPlacesOfInterest: PlaceOfInterest[] = [
  {
    searchTerm: "",
    weight: 100,
    distance: 1,
    inMiles: true,
    transportMode: "WALKING",
  },
];

interface IProps {
  setRankingResult: Dispatch<SetStateAction<RankResult | null>>;
}

const Priorities = (props: IProps) => {
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [placesOfInterest, dispatchplacesOfInterest] = useReducer(
    reducer,
    initialPlacesOfInterest
  );
  const [error, setError] = useState<string | null>("");
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
              key={`key-${i}`}
              dispatch={dispatchplacesOfInterest}
              placeOfInterest={place}
            />
          ))}

          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Priorities;
