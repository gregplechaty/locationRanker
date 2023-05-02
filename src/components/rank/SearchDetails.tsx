import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "styles/rank/rankCard.module.css";

const SearchDetails = () => {
  return (
    <Grid item xs={12} md={12}>
      <Paper className={styles.minHeight} elevation={2}>
        <Box padding={1}>
          <Typography variant="h4">Details</Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SearchDetails;
