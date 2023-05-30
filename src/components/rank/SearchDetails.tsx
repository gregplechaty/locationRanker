import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styles from "styles/rank/rankCard.module.css";
import { RankResult } from "pages/rank";
import DetailCard from "components/rank/SearchDetails/DetailCard";

interface IProps {
  isLoaded: boolean;
  rankingResult: RankResult | null;
}

const SearchDetails = (props: IProps) => {
  const { isLoaded, rankingResult } = props;
  if (!rankingResult?.data?.place_data) return null;
  return (
    <Grid item xs={12} md={12}>
      <Paper className={styles.minHeight} elevation={2}>
        <Box padding={1}>
          <Typography variant="h4">Details</Typography>
          {rankingResult.data.place_data.map((placeData) => (
            <DetailCard
              key={`${placeData.search_term}-${placeData.address_geocode}`}
              placeData={placeData}
            />
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};

export default SearchDetails;
