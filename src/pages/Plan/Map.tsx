import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
import pxToVw from "@utils/PxToVw";
import { saveStoredMarkers } from "@utils/LocalStorage";
import { fetchLocation } from "@api/planListApi";
import usePlanStore from "@store/usePlanStore";
import Info from "@components/ui/Modal/InfoWindow";
import { findPlaceDetail } from "@api/infoApi";

const center = {
  lat: 37.5649867,
  lng: 126.985575,
};

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
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>();

  // 1. 장소의 좌표 데이터 저장하기
  const fetchMarker = async () => {
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
              const placeDetail = await findPlaceDetail(placeId);

              const newStoredMarker = {
                lat: lat(),
                lng: lng(),
                address: plan.address,
                placeName: plan.place,
                placeId,
                photoUrl: placeDetail.photoUrl,
              };

              markers.push({
                position: { lat: lat(), lng: lng() },
                placeName,
                placeId,
                photoUrl: placeDetail.photoUrl,
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
    } catch (error) {
      console.log("fetchMarker error: ", error);
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
  }, [plans, currentDay]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{ styles: customMap }}
      onClick={resetSelectedMarker}
    >
      {markerList.map((marker, index) => (
        <>
          <MarkerF
            key={index}
            position={marker.position}
            label={(index + 1).toString()}
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

const customMap = [
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        color: "#f7f1df",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#d0e3b4",
      },
    ],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#bde6ab",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffe15f",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#efd151",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];
