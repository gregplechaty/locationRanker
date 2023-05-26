import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { GoogleMap, Marker } from "@react-google-maps/api";

import styles from "styles/rank/rankCard.module.css";
import { Geocode, RankResult } from "pages/rank";

const homeLabel = {
  text: "Home Address",
  fontWeight: "bold",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
interface MarkerData {
  position: Geocode;
  title: string;
}

interface IProps {
  isLoaded: boolean;
  rankingResult: RankResult | null;
  shouldDisplayMap: boolean;
}

const Map = (props: IProps) => {
  const { isLoaded, rankingResult, shouldDisplayMap } = props;
  const [, setMap] = useState<google.maps.Map | null>(null);
  const onLoad = (map: google.maps.Map) => {
    console.log("onload");
    const bounds = new window.google.maps.LatLngBounds(center);
    markers?.map((item) => {
      bounds.extend(item.position);
    });
    map.fitBounds(bounds);

    setMap(map);
  };

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  const center = useMemo<LatLngLiteral>(
    () =>
      rankingResult?.data?.home_address_geocode?.lat &&
      rankingResult?.data?.home_address_geocode?.lng
        ? {
            lat: rankingResult?.data?.home_address_geocode?.lat,
            lng: rankingResult?.data?.home_address_geocode?.lng,
          }
        : { lat: 41.8789, lng: -87.6359 },
    [
      rankingResult?.data?.home_address_geocode?.lat,
      rankingResult?.data?.home_address_geocode?.lng,
    ]
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const markers = useMemo<MarkerData[] | undefined>(
    () =>
      rankingResult?.data?.place_data?.map((place) => ({
        position: place.address_geocode,
        title: place.name,
      })),
    [rankingResult?.data?.place_data]
  );

  return (
    <Grid item xs={12} sm={8}>
      <Paper className={styles.minHeight} elevation={2}>
        {isLoaded && shouldDisplayMap && center ? (
          <GoogleMap
            zoom={13}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {center && (
              <Marker
                key={`home-address`}
                position={center}
                label={homeLabel}
              />
            )}
            {markers &&
              markers.length > 0 &&
              markers.map((place) => (
                <Marker
                  key={`${place.title}-${place.position.lat}`}
                  position={place.position}
                  label={place.title}
                />
              ))}
          </GoogleMap>
        ) : !isLoaded && shouldDisplayMap ? (
          <div>map is loading...</div>
        ) : (
          <div>Map will display here after you rank a home address.</div>
        )}
      </Paper>
    </Grid>
  );
};

export default Map;
