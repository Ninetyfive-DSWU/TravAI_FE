import React, { useEffect, useState } from "react";
import { InfoWindowF } from "@react-google-maps/api";
import styled from "styled-components";
import "@components/ui/Modal/InfoWindow/Info.css";
import Typography from "@components/ui/Typography/Typography";

type MarkerProps = {
  position: {
    lat: number;
    lng: number;
  };
  placeName: string;
  placeId: string;
  photoUrl: string;
  onCloseClick: () => void;
};

const Info: React.FC<MarkerProps> = ({ position, placeName, placeId, photoUrl, onCloseClick }) => {
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    const stored = localStorage.getItem("storedMarkers");
    if (stored) {
      const parsedMarkers = JSON.parse(stored);
      const marker = parsedMarkers.find((marker: MarkerProps) => marker.placeId === placeId);
      if (marker) {
        setAddress(marker.address);
      }
    }
  }, [placeId]);

  console.log(photoUrl);

  return (
    <InfoWindowF
      position={position}
      options={{ pixelOffset: new window.google.maps.Size(0, -45) }}
      onCloseClick={onCloseClick}
    >
      <InfoContainer>
        <img src={photoUrl} alt="Place" />
        <Typography content={`${placeName}`} size={20} fontWeight={600} />
        <Typography content={`${address}`} size={16} />
      </InfoContainer>
    </InfoWindowF>
  );
};

export default Info;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 350px;
  margin: 0 20px;
  gap: 5px;
`;
