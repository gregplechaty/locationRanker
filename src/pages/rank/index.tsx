import Link from "next/link";
import styles from "@/styles/Rank.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ScoreCard from "components/rank/ScoreCard";
import Map from "components/rank/Map";
import Priorities from "components/rank/Priorities";
import SearchDetails from "components/rank/SearchDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Rank() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Map />
        <ScoreCard />
        <Priorities />
        <SearchDetails />
      </Grid>
      <div>
        <Button variant="contained">
          <Link href="/">Home</Link>
        </Button>
      </div>
      {/* invisible map */}
      <div id="invisibleMap" style={{ width: "0px", height: "0px" }}></div>
    </Container>
  );
}
