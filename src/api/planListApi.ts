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
