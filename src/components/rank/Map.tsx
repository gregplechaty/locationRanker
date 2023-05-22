import { useMemo } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "styles/rank/rankCard.module.css";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";

const containerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const addresses = [
  "1600 Amphitheatre Parkway, Mountain View, CA",
  "1 Infinite Loop, Cupertino, CA",
  "350 5th Ave, New York, NY",
];

interface IProps {
  isLoaded: boolean;
}

const Map = (props: IProps) => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <Grid item xs={12} sm={8}>
      <Paper className={styles.minHeight} elevation={2}>
        {props.isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            // mapContainerStyle={containerStyle}
          ></GoogleMap>
        ) : (
          <div>map is loading...</div>
        )}

        {/* <LoadScript googleMapsApiKey="AIzaSyBoJrlBWLCfwIj7kgJQg2yEabn9RWLihhY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            //@ts-ignore
            onLoad={(map) => (mapRef.current = map)}
          > */}
        {/* Markers can be added here if needed
          </GoogleMap>
        </LoadScript> */}
      </Paper>
    </Grid>
  );
};

export default Map;
