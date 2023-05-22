import { useCallback, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "styles/rank/rankCard.module.css";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
  width: "100%",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface IProps {
  isLoaded: boolean;
}

const Map = (props: IProps) => {
  const mapRef = useRef<google.maps.Map>();

  const onLoad = useCallback((map: google.maps.Map | undefined): void => {
    if (map) {
      mapRef.current = map;
    }
  }, []);
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 43.077652, lng: -87.882885 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const [homeAddress, setHomeAddres] = useState<LatLngLiteral>();
  return (
    <Grid item xs={12} sm={8}>
      <Paper className={styles.minHeight} elevation={2}>
        {props.isLoaded ? (
          <GoogleMap
            zoom={13}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          >
            <Marker
              position={{ lat: 43.077654, lng: -87.882888 }}
              title="Home Address"
            />
          </GoogleMap>
        ) : (
          <div>map is loading...</div>
        )}
      </Paper>
    </Grid>
  );
};

export default Map;
