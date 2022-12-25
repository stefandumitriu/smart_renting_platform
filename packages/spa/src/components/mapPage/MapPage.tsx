import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";

const Map: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

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

  return <div ref={ref} style={{ height: "100vh", width: "100%" }} />;
};

export default function MapPage() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <Wrapper apiKey="AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk" render={render}>
      <div>Map Page</div>
      <Map />
    </Wrapper>
  );
}
