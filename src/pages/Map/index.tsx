import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { API_KEY } from '../../config';
import pxToVw from '@utils/PxToVw';
import PlanPage from '@pages/Map/PlanPage';

const containerStyle = {
  width: pxToVw(1290),
  height: '100%',
};

const center = {
  lat: 37.5649867,
  lng: 126.985575,
};

const Map: React.FC = () => {
  // Map 컴포넌트의 로딩
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  if (loadError) {
    console.error('Error loading Google Maps API:', loadError);
    return <div>Error loading map</div>;
  }

  return isLoaded ? (
    <MapContainer>
      <PlanPage />
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
    </MapContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
