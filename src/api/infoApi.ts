import { BASE_URL } from "@constants/Constants";
// import axios from "axios";
// import { API_KEY } from "../config";

// place_detail, photo_url,
export const findPlaceDetail = async (placeId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/placedetails/?place_id=${placeId}`);
    const data = await response.json();

    const placeName = await data.result.name;
    const photoResponse = await fetch(`${BASE_URL}/fetchplacephoto/?placeName=${placeName}`);

    return { placeDetail: data.result, photoUrl: photoResponse.url };
  } catch (error) {
    console.error("place details error:", error);
    throw error;
  }
};
