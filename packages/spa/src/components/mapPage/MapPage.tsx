import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import Layout from "../Layout";

const Map: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const theme = useTheme();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          center: {
            lat: 45.973118475875594,
            lng: 24.959025390901253,
          },
          zoom: 7,
        })
      );
    }
  }, [ref, map]);

  return (
    <Grid container item sx={{ height: "100vh", width: "100%" }} mt={2}>
      <Grid item ref={ref} sx={{ height: "70%", width: "70%" }} />
      <Grid item container flexDirection="column" xs ml={2}>
        <Grid item xs="auto">
          <Typography
            color={theme.palette.secondary.main}
            fontWeight="bolder"
            fontSize={30}
            align="center"
          >
            Properties Nearby
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function MapPage() {
  return (
    <Layout>
      <Grid item>
        <Wrapper apiKey="AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk">
          <Map />
        </Wrapper>
      </Grid>
    </Layout>
  );
}
