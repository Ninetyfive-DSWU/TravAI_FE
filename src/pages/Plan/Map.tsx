import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import pxToVw from "@utils/PxToVw";

const containerStyle = {
  width: pxToVw(1290),
  height: "100%",
};

const center = {
  lat: 37.5649867,
  lng: 126.985575,
};

const Map: React.FC = () => {
  return <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />;
};

export default Map;
