/// <reference types="googlemaps" />
import { BASE_URL } from "@constants/Constants";
import axios from "axios";

interface Plan {
  id: number;
  time: string;
  place: string;
  address: string;
  city: string;
  day: string;
  endday: string;
  startday: string;
  move: null | string;
  order: number;
  session_id: string;
}

export const GetPlan = async (sessionId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/planlist/${sessionId}/`);
    const plans = response.data;
    const nights =
      Math.max(...plans.map((plan: Plan) => parseInt(plan.day))) - 1;
    return { plans, nights };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface GeocodeResult {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  place_id: string;
}

export const fetchLocation = async (address: string) => {
  const geocoder = new window.google.maps.Geocoder();

  try {
    const response = await new Promise<GeocodeResult[]>((resolve, reject) => {
      geocoder.geocode(
        { address },
        (
          results: GeocodeResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error("Geocoding error: " + status));
          }
        }
      );
    });

    console.log("api호출");
    return response;
  } catch (error) {
    console.error("fetchLocation error: ", error);
  }
};

export const UpdatePlan = async (
  sessionId: string | undefined,
  plans: Plan[]
) => {
  try {
    const updatedPlans = plans.map((plan, index) => ({
      ...plan,
      order: (index + 1) * 10,
    })); // order를 10단위로 증가시키며 업데이트 -> 서버에서의 정렬을 위함

    const jsonPlanData = JSON.stringify(updatedPlans);

    const response = await axios.put(
      `${BASE_URL}/planlist/detail/${sessionId}/`,
      jsonPlanData,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("UpdatePlan error:", error);
    throw error;
  }
};
