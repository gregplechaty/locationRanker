import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "styles/rank/rankCard.module.css";

const Map = () => {
  return (
    <Grid item xs={12} sm={8}>
      <Paper className={styles.minHeight} elevation={2}>
        Map coming soon!
      </Paper>
    </Grid>
  );
};

export default Map;
