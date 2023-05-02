import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { AntSwitch } from "./Priorities/AntSwitch";
import ModeDropdown from "./Priorities/ModeDropdown";

const Priorities = () => {
  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={2}>
        <Box padding={1}>
          <Typography variant="h4" component="h3">
            Your Priorities
          </Typography>
          <TextField
            sx={{ width: "90%" }}
            label="Home Address"
            variant="outlined"
            placeholder="e.g. 875 North Michigan Avenue, Chicago, IL 60611"
            value="This is where state goes"
          />
          <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0.5rem" }}>
            <Box display="flex" flexDirection="column">
              <Box paddingY={1}>
                <TextField
                  sx={{ width: "25rem" }}
                  label="Search Term"
                  variant="outlined"
                  placeholder='e.g. "groceries", "airport"'
                />
              </Box>

              <Box display="flex" paddingY={1}>
                <TextField
                  label="Distance"
                  type="number"
                  variant="outlined"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    shrink: true,
                    step: 0.1,
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  paddingLeft="1rem"
                >
                  <Typography>Miles</Typography>
                  <AntSwitch inputProps={{ "aria-label": "ant design" }} />
                  <Typography>Kilometers</Typography>
                </Stack>
              </Box>
              <Box paddingY={1}>
                <ModeDropdown />
              </Box>
            </Box>
          </Paper>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Priorities;
