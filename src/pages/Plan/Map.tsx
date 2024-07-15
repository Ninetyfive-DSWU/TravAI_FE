import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
import pxToVw from "@utils/PxToVw";
import { saveStoredMarkers } from "@utils/LocalStorage";
import { fetchLocation } from "@api/planListApi";
import usePlanStore from "@store/usePlanStore";
import Info from "@components/ui/Modal/InfoWindow";
import { findPlaceDetail, findPhotoUrl } from "@api/infoApi";
import { loadScript } from "@utils/LoadScript";
import { API_KEY } from "../../config";
import { customMap } from "@assets/styles/CustomMap";

const containerStyle = {
  width: pxToVw(1290),
  height: "100%",
};

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  placeName: string;
  placeId: string;
  photoUrl: string;
};

type StoredMarker = {
  lat: number;
  lng: number;
  placeName: string;
  address: string;
  placeId: string;
  photoUrl: string;
};

const Map: React.FC = () => {
  const { plans, currentDay } = usePlanStore();
  const [markerList, setMarkerList] = useState<Marker[]>([]);
  const [storedMarkers, setStoredMarkers] = useState<StoredMarker[]>(() => {
    const stored = localStorage.getItem("storedMarkers");
    return stored ? JSON.parse(stored) : [];
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  useEffect(() => {
    const initGoogleServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setLoading(false);
      } else {
        console.error("Google Maps 스크립트 로드 실패");
      }
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&language=ko`,
      initGoogleServices,
    );
  }, []);

  // 1. 장소의 좌표 데이터 저장하기
  const fetchMarker = async () => {
    setLoading(true);
    try {
      const markers: Marker[] = [];
      const updatedStoredMarkers = [...storedMarkers];

      for (const plan of plans) {
        if (parseInt(plan.day) === currentDay) {
          const placeName = plan.place;
          // 저장된 마커 데이터에서 해당 주소를 찾기
          const storedMarker = updatedStoredMarkers.find((marker) => marker.address === plan.address);

          if (storedMarker) {
            // 저장된 마커가 있다면 추가
            markers.push({
              position: { lat: storedMarker.lat, lng: storedMarker.lng },
              placeName: storedMarker.placeName,
              placeId: storedMarker.placeId,
              photoUrl: storedMarker.photoUrl,
            });
          } else {
            // 저장된 마커가 없다면 API 호출하여 좌표 가져오기
            const location = await fetchLocation(plan.address);

            if (location && location[0] && location[0].geometry && location[0].geometry.location) {
              const { lat, lng } = location[0].geometry.location;
              const placeId = location[0].place_id;
              // const placeDetail = await findPlaceDetail(placeId);
              const photoUrl = await findPhotoUrl(plan.place);

              const newStoredMarker = {
                lat: lat(),
                lng: lng(),
                address: plan.address,
                placeName: plan.place,
                placeId,
                photoUrl,
              };

              markers.push({
                position: { lat: lat(), lng: lng() },
                placeName,
                placeId,
                photoUrl,
              });

              if (!updatedStoredMarkers.some((marker) => marker.address === plan.address)) {
                updatedStoredMarkers.push(newStoredMarker);
                saveStoredMarkers(updatedStoredMarkers);
              }
            }
          }
        }
      }

      // 마커 리스트 상태 업데이트
      setStoredMarkers(updatedStoredMarkers);
      setMarkerList(markers);
      fitBoundsToMarkers(markers);
      setLoading(false);
    } catch (error) {
      console.log("fetchMarker error: ", error);
      setLoading(false);
    }
  };

  // 2. Bound 계산하여 지도의 center 값 설정하기
  const fitBoundsToMarkers = (markers: Marker[]) => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      // 각 마커에 대해 경계 확장
      markers.forEach((marker) => {
        bounds.extend(new google.maps.LatLng(marker.position));
      });
      mapRef.current.fitBounds(bounds); // 경계를 지도에 맞추기
    }
  };

  const handleClickMarker = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  const resetSelectedMarker = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    fetchMarker();
    resetSelectedMarker();
  }, [plans, currentDay, loading]);

  if (loading) {
    return <div>경로를 생성중입니다...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      onLoad={(map) => {
        mapRef.current = map;
        if (markerList.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markerList.forEach((marker) => {
            bounds.extend(new google.maps.LatLng(marker.position));
          });
          map.fitBounds(bounds);
        }
      }}
      options={{ disableDefaultUI: true, styles: customMap }}
      onClick={resetSelectedMarker}
    >
      {markerList.map((marker, index) => (
        <>
          <MarkerF
            key={index}
            position={marker.position}
            label={{ text: (index + 1).toString(), color: "white" }}
            onClick={() => handleClickMarker(marker)}
          />
          {selectedMarker && (
            <Info
              position={selectedMarker.position}
              placeName={selectedMarker.placeName}
              placeId={selectedMarker.placeId}
              photoUrl={selectedMarker.photoUrl}
              onCloseClick={() => setSelectedMarker(null)}
            />
          )}
        </>
      ))}
      <PolylineF
        path={markerList.map((marker) => ({ lat: marker.position.lat, lng: marker.position.lng }))}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
};

export default Map;
