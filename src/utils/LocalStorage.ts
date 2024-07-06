type StoredMarker = {
  lat: number;
  lng: number;
  address: string;
  placeId: string;
};

// 로컬 스토리지에 마커 데이터를 저장하는 함수
export const saveStoredMarkers = (markers: StoredMarker[]) => {
  localStorage.setItem("storedMarkers", JSON.stringify(markers));
};
