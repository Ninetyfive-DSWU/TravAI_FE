import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";
import { API_KEY } from "../../config";
import PlanPage from "@pages/Plan/PlanPage";
import Map from "@pages/Plan/Map";
import { GetPlan } from "@api/planListApi";
import usePlanStore from "@store/usePlanStore";

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Plan: React.FC = () => {
  const { setPlans, setNights } = usePlanStore();
  const { sessionId } = useParams<{ sessionId: string }>();
  useEffect(() => {
    if (!sessionId) return;
    const fetchPlanList = async () => {
      try {
        const { plans, nights } = await GetPlan(sessionId);
        setPlans(plans);
        setNights(nights);
      } catch (error) {
        console.error("Error fetching plan list:", error);
      }
    };

    fetchPlanList();
    // 마커 관련 로컬 스토리지 초기화
    localStorage.removeItem("storedMarkers");
  }, [sessionId, setPlans, setNights]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  if (loadError) {
    console.error("Error loading Google Maps API:", loadError);
    return <div>Error loading map</div>;
  }

  return isLoaded ? (
    <MapContainer>
      <PlanPage />
      <Map />
    </MapContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default Plan;
