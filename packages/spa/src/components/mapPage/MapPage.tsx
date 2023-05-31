import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, useTheme } from "@mui/material";
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

  const toggleHighlight = useCallback((markerView: any, listing: Listing) => {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }, []);

  const buildContent = useCallback((listing: Listing) => {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
    <div class="icon">
        ${listing.price}€
    </div>
    <div class="details">
        <div class="price" style="color: black">${listing.title}</div>
        <div class="address">${
          listing.apartment.address.streetType +
          " " +
          listing.apartment.address.streetName +
          ", Nr. " +
          listing.apartment.address.streetNumber
        }</div>
        <div class="features">
            <div>
                <span style="color: black">${
                  listing.apartment.noOfRooms
                } cam.</span>
            </div>
            <div>
                <span style="color: black">${
                  listing.apartment.noOfBathrooms
                } bai</span>
            </div>
            <div>
                <span style="color: black">${
                  listing.apartment.surface
                } m<sup>2</sup></span>
            </div>
            <a class="btn" href="/properties/${listing.id}">
                Vezi anunt
            </a>
        </div>
    </div>
    `;
    return content;
  }, []);

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
            return undefined;
          }
          const latLng = {
            lat: listing.apartment.address.lat,
            lng: listing.apartment.address.long,
          };
          const marker = new markerLibrary.AdvancedMarkerElement({
            position: latLng,
            map,
            content: buildContent(listing),
          });
          marker.addListener("click", () => toggleHighlight(marker, listing));
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
    <Grid
      container
      item
      sx={{
        height: "100vh",
        width: "80%",
        border: `4px solid ${theme.palette.secondary.main}`,
      }}
      mt={2}
      padding={2}
      mx="auto"
    >
      <Grid
        item
        ref={ref}
        sx={{
          height: "100%",
          width: "100%",
        }}
      />
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
