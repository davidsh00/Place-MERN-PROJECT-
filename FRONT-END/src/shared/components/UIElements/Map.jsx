import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { location } = props;
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    >
      <h2>lat: {location.lat}</h2>
      <h2>lng: {location.lng}</h2>
    </div>
  );
};

export default Map;
