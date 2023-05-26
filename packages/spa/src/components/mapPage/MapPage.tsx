import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import Layout from "../Layout";
import { useLoaderData } from "react-router-dom";
import { Listing } from "@packages/api/models/listings/listing";
import "../../style.scss";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const Map: React.FC<{ listings: Listing[] }> = ({ listings }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markerLibrary, setMarkerLibrary] =
    useState<google.maps.MarkerLibrary>();
  const theme = useTheme();

  useEffect(() => {
    google.maps
      .importLibrary("marker")
      .then((res) => setMarkerLibrary(res as google.maps.MarkerLibrary));
  }, []);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          center: {
            lat: 44.432358355775,
            lng: 26.09869194439505,
          },
          zoom: 13,
          mapId: "9d8e91b607d5991b",
        })
      );
    }
  }, [ref, map]);

  useEffect(() => {
    if (map && listings && markerLibrary) {
      const markers = listings
        .map((listing) => {
          if (
            !listing.apartment.address.lat ||
            !listing.apartment.address.long
          ) {
            return;
          }
          const latLng = {
            lat: listing.apartment.address.lat,
            lng: listing.apartment.address.long,
          };
          const priceTag = document.createElement("div");
          priceTag.className = "price-tag";
          priceTag.textContent = listing.price + "€";
          const marker = new markerLibrary.AdvancedMarkerElement({
            position: latLng,
            map,
            content: priceTag,
          });
          return marker;
        })
        .filter(
          (marker): marker is google.maps.marker.AdvancedMarkerElement =>
            !!marker
        );
      new MarkerClusterer({ markers, map });
    }
  }, [map, markerLibrary, listings]);

  return (
    <Grid container item sx={{ height: "100vh", width: "100%" }} mt={2}>
      <Grid item ref={ref} sx={{ height: "100%", width: "60%" }} />
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
  const listings = useLoaderData() as Listing[];
  return (
    <Layout>
      <Grid item>
        <Wrapper
          apiKey="AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk"
          libraries={["marker"]}
        >
          <Map listings={listings} />
        </Wrapper>
      </Grid>
    </Layout>
  );
}
