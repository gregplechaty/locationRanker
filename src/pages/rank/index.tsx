import Link from "next/link";
import styles from "@/styles/Rank.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Rank() {
  return (
    <Box
      className={`${styles.backgroundImg}`}
      sx={{
        width: 1,
        height: 1,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div>Nav Header</div>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Item>Map</Item>
        </Grid>
        <Grid xs={12} md={4}>
          <Item>Score/Rank</Item>
        </Grid>
        <Grid xs={12} md={12}>
          <Item>Search inputs</Item>
        </Grid>
        <Grid xs={12} md={12}>
          <Item>details</Item>
        </Grid>
      </Grid>

      <div>
        <Button variant="contained">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </Box>
  );
}
