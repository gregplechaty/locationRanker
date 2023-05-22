import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "styles/rank/ScoreCard.module.css";

interface IProps {
  overallScore: number | null;
}

const ScoreCard = (props: IProps) => {
  return (
    <Grid item xs={12} sm={4}>
      <Paper className={styles.scoreCard} elevation={2}>
        Score: {props.overallScore && props.overallScore}
      </Paper>
    </Grid>
  );
};

export default ScoreCard;
