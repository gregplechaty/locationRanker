import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlaceData } from "pages/rank";

interface IProps {
  placeData: PlaceData;
}
const DetailCard = (props: IProps) => {
  const { address, distance_text, name, search_term, types } = props.placeData;

  if (!address || !name) return null;
  return (
    <Paper
      elevation={3}
      sx={{ padding: "1rem", margin: "1rem 0.5rem", maxWidth: "40rem" }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">{search_term}:</Typography>
          <Typography variant="h5">{name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">Address:</Typography>
          <Typography variant="h5">{address} </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">Distance:</Typography>
          <Typography variant="h5">{distance_text}</Typography>
        </Stack>
        <Box display="flex" flexWrap="wrap" m={-1}>
          <Typography variant="h5">Tags:</Typography>
          {types &&
            types.map((type) => (
              <Box key={type} mx={0.7} my={0.2}>
                <Chip key={type} label={type} />
              </Box>
            ))}
        </Box>
      </Stack>
    </Paper>
  );
};
export default DetailCard;
