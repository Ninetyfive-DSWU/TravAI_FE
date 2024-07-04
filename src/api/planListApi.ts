/// <reference types="googlemaps" />
import { BASE_URL } from "@constants/Constants";
import axios from "axios";

export const planList = async (sessionId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/planlist/${sessionId}/`);

    return response.data;
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
      geocoder.geocode({ address }, (results: GeocodeResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          resolve(results);
        } else {
          reject(new Error("Geocoding error: " + status));
        }
      });
    });

    console.log("api호출");
    return response;
  } catch (error) {
    console.error("fetchLocation error: ", error);
  }
};
