import { BASE_URL } from "@constants/Constants";

export const findPlaceDetail = async (placeId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/placedetails/?place_id=${placeId}`);
    const data = await response.json();

    return data.result;
  } catch (error) {
    console.error("place details error:", error);
    throw error;
  }
};

export const findPhotoUrl = async (placeName: string) => {
  try {
    const response = await fetch(`${BASE_URL}/fetchplacephoto/?placeName=${placeName}`);

    return response.url;
  } catch (error) {
    console.error("photo url error:", error);
    throw error;
  }
};
