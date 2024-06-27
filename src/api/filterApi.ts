import { API_BASE_URL } from "@constants/Constants";
interface FilteredData {
  place: string;
  companions: string;
  nights: number;
  theme: string;
  startdate: string;
  enddate: string;
}

export const Filtering = async (filteredData: FilteredData) => {
  const jsonFilteredData = JSON.stringify(filteredData);
  try {
    const response = await fetch(`${API_BASE_URL}/make_prompt/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: jsonFilteredData,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
