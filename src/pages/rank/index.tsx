import Link from "next/link";
import styles from "@/styles/Map.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ScoreCard from "components/rank/ScoreCard";
import Map from "components/rank/Map";
import Priorities from "components/rank/Priorities";
import SearchDetails from "components/rank/SearchDetails";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

export interface RankResult {
  status: number;
  message: string;
  data?: RankData;
}

interface RankData {
  score: number;
  place_data?: PlaceData[];
}

interface PlaceData {
  is_place_found: boolean;
  search_term: string;
  name: string;
  address: string;
  mode: string;
  score: number;
  distace: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Rank = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY ?? "",
  });
  const [rankingResult, setRankingResult] = useState<RankResult | null>(null);

  const overallScore = rankingResult?.data?.score ?? null;
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Map
          rankingResult={rankingResult}
          shouldDisplayMap={!!overallScore}
          isLoaded={isLoaded}
        />
        <ScoreCard overallScore={overallScore} />
        <Priorities setRankingResult={setRankingResult} />
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
};

export default Rank;
