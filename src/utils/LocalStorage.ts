type StoredMarker = {
  lat: number;
  lng: number;
  address: string;
  place_id: string;
};

// 로컬 스토리지에서 저장된 마커 데이터를 가져오는 함수
export const loadStoredMarkers = () => {
  const stored = localStorage.getItem("storedMarkers");
  return stored ? JSON.parse(stored) : [];
};

// 로컬 스토리지에 마커 데이터를 저장하는 함수
export const saveStoredMarkers = (markers: StoredMarker[]) => {
  localStorage.setItem("storedMarkers", JSON.stringify(markers));
};
